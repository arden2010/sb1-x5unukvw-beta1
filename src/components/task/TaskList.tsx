import React from 'react';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import { TaskSorter } from '../../utils/sorting/taskSorter';

interface TaskListProps {
  tasks: (Task & { isDeleted?: boolean; isCompleted?: boolean })[];
  onStatusChange: (id: string, status: Task['status']) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete }: TaskListProps) {
  // Sort tasks: incomplete first, then by priority and date
  const sortedTasks = React.useMemo(() => 
    TaskSorter.sort(tasks, {
      prioritizeRecent: true,
      prioritizeUndone: true
    })
  , [tasks]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {sortedTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无任务</p>
          <p className="text-sm text-gray-400 mt-2">
            点击内容可以查看详情，或从内容中提取任务
          </p>
        </div>
      )}
    </div>
  );
}