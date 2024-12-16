import { Content, Task } from '../../../types';
import { formatRelativeTime } from '../../../utils/date';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentTextIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useContentViewer } from '../../../hooks/useContentViewer';
import { useStore } from '../../../store';

interface RecentActivityProps {
  contents: Content[];
  tasks: Task[];
}

export default function RecentActivity({ contents, tasks }: RecentActivityProps) {
  const navigate = useNavigate();
  const { handleView } = useContentViewer();
  const { updateTask } = useStore();

  const activities = [
    ...contents.map(content => ({
      type: 'content' as const,
      item: content,
      date: new Date(content.createdAt)
    })),
    ...tasks.map(task => ({
      type: 'task' as const,
      item: task,
      date: new Date(task.createdAt)
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleItemClick = (activity: typeof activities[0]) => {
    if (activity.type === 'content') {
      handleView(activity.item as Content);
    } else {
      navigate('/tasks', { state: { selectedTask: activity.item } });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">最近活动</h2>
          <div className="flex gap-2">
            <Link
              to="/contents"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              所有内容
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/tasks"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              所有任务
            </Link>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <ul className="-mb-8">
            {activities.map((activity, idx) => (
              <li key={activity.item.id}>
                <div className="relative pb-8">
                  {idx !== activities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div 
                    className="relative flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleItemClick(activity)}
                  >
                    <div>
                      <span className={`
                        h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                        ${activity.type === 'content' ? 'bg-blue-50' : 'bg-green-50'}
                      `}>
                        {activity.type === 'content' ? (
                          <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                        ) : (
                          <ClipboardDocumentListIcon className="h-5 w-5 text-green-500" />
                        )}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {activity.item.title}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {formatRelativeTime(activity.date)}
                        </p>
                        {activity.type === 'task' && (
                          <div className="mt-1">
                            <span className={`
                              inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                              ${activity.item.status === 'done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            `}>
                              {activity.item.status === 'done' ? '已完成' : '进行中'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}