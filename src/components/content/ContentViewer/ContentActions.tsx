import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Content } from '../../../types';

interface ContentActionsProps {
  content: Content;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
}

export default function ContentActions({ content, onEdit, onDelete }: ContentActionsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex space-x-2">
      {onEdit && (
        <button
          onClick={() => onEdit(content)}
          className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
          title="编辑"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete(content)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
          title="删除"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}