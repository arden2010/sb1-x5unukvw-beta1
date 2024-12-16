import { Task } from '../../types';
import { formatDateTime } from '../../utils/date';
import { useStore } from '../../store';
import { Link } from 'react-router-dom';
import { UserCircleIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface TaskViewerProps {
  task: Task;
  onClose: () => void;
  onEdit?: (task: Task) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
}

export default function TaskViewer({ task, onClose, onEdit, onStatusChange }: TaskViewerProps) {
  const { contents } = useStore();
  const relatedContents = contents.filter(content => 
    task.relatedContentIds.includes(content.id)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">关闭</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {task.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">描述</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{task.description}</p>
            </div>
          )}

          {relatedContents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">相关内容</h4>
              <div className="space-y-2">
                {relatedContents.map(content => (
                  <Link
                    key={content.id}
                    to="/contents"
                    state={{ selectedContent: content }}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                  >
                    <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {content.title || content.content.slice(0, 50)}...
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-6">
            {task.assignee && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserCircleIcon className="w-5 h-5 text-gray-400" />
                <span>{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <span>截止: {formatDateTime(task.dueDate)}</span>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500">
            创建于 {formatDateTime(task.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}