import React from 'react';
import { Task } from '../../types';
import { formatRelativeTime } from '../../utils/date';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface TaskCardProps {
  task: Task & { isDeleted?: boolean; isCompleted?: boolean };
  onStatusChange?: (id: string, status: Task['status']) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  const isDone = task.status === 'done' || task.isCompleted;
  const isDeleted = task.isDeleted;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStatusChange && !isDeleted) {
      onStatusChange(task.id, isDone ? 'todo' : 'done');
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && !isDeleted) {
      onDelete(task.id);
    }
  };

  return (
    <div 
      className={`
        group px-4 py-3 border-b border-gray-200 
        transition-all duration-300 ease-in-out
        ${isDone ? 'opacity-60' : ''}
        ${isDeleted ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50 cursor-pointer'}
      `}
      onClick={() => !isDeleted && onEdit?.(task)}
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <button
            onClick={handleCheckboxClick}
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-colors duration-300
              ${isDone ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 hover:border-blue-500'}
              ${isDeleted ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={isDeleted}
          >
            {isDone && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className={`text-sm font-normal ${isDone ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
          </div>
          
          {(task.description || task.assignee || task.dueDate) && (
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              {task.description && (
                <span className="line-clamp-1">{task.description}</span>
              )}
              {task.assignee && (
                <div className="flex items-center gap-1">
                  <UserCircleIcon className="h-3.5 w-3.5" />
                  <span>{task.assignee}</span>
                </div>
              )}
              {task.dueDate && (
                <span>截止: {formatRelativeTime(task.dueDate)}</span>
              )}
            </div>
          )}
        </div>

        {/* Priority indicator */}
        {task.priority !== 'medium' && (
          <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
            task.priority === 'high' ? 'bg-red-500' : 'bg-gray-300'
          }`} />
        )}

        {/* Delete button */}
        {!isDeleted && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
              title="删除"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}