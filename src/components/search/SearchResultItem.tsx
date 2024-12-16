import { Content, Task } from '../../types';
import { DocumentTextIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { formatRelativeTime } from '../../utils/date';
import { useNavigate } from 'react-router-dom';

interface SearchResultItemProps {
  item: Content | Task;
  type: 'content' | 'task';
  onClose: () => void;
}

export default function SearchResultItem({ item, type, onClose }: SearchResultItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'content') {
      navigate('/contents', { state: { selectedContent: item } });
    } else {
      navigate('/tasks', { state: { selectedTask: item } });
    }
    onClose();
  };

  const Icon = type === 'content' ? DocumentTextIcon : ClipboardDocumentListIcon;

  return (
    <div
      onClick={handleClick}
      className="p-4 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors duration-200"
    >
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-900">{item.title}</div>
          <div className="mt-1 text-xs text-gray-500 line-clamp-2">
            {type === 'content' ? (item as Content).content : (item as Task).description}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {formatRelativeTime(item.createdAt)}
            </span>
            {type === 'content' && (item as Content).tags.length > 0 && (
              <div className="flex gap-1">
                {(item as Content).tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {type === 'task' && (
              <span className={`
                inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium
                ${(item as Task).status === 'done' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}
              `}>
                {(item as Task).status === 'done' ? '已完成' : '进行中'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}