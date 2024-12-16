import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Content, Task } from '../../types';
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  ChartBarIcon,
  TagIcon 
} from '@heroicons/react/24/outline';
import StatsCard from '../../components/Dashboard/StatsCard';
import Brain from '../../components/graph/Brain';
import ContentStats from './components/ContentStats';
import RecentActivity from './components/RecentActivity';
import TaskOverview from './components/TaskOverview';

export default function Dashboard() {
  const navigate = useNavigate();
  const { contents, tasks, tags } = useStore();
  const [recentContents, setRecentContents] = useState<Content[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Get contents from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    setRecentContents(
      contents
        .filter(c => new Date(c.createdAt) > sevenDaysAgo)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    );

    setRecentTasks(
      tasks
        .filter(t => new Date(t.createdAt) > sevenDaysAgo)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    );
  }, [contents, tasks]);

  const statsCards = [
    {
      title: '内容总数',
      value: contents.length,
      icon: DocumentTextIcon,
      color: 'text-blue-500',
      to: '/contents'
    },
    {
      title: '待办任务',
      value: tasks.filter(t => t.status !== 'done').length,
      icon: ClipboardDocumentListIcon,
      color: 'text-green-500',
      to: '/tasks'
    },
    {
      title: '本周新增',
      value: recentContents.length,
      icon: ChartBarIcon,
      color: 'text-purple-500'
    },
    {
      title: '标签数量',
      value: tags.length,
      icon: TagIcon,
      color: 'text-indigo-500',
      to: '/tags'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">仪表盘</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      {/* Content Stats */}
      <ContentStats contents={contents} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity 
          contents={recentContents}
          tasks={recentTasks}
        />
        <TaskOverview tasks={tasks} />
      </div>

      {/* Brain Graph */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">知识关联</h2>
        <Brain />
      </div>
    </div>
  );
}