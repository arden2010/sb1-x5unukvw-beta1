import { PencilIcon, TrashIcon } from '../../../components/icons';
import { Content } from '../../../types';

interface ActionButtonsProps {
  content: Content;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
}

export default function ActionButtons({ content, onEdit, onDelete }: ActionButtonsProps) {
  if (!onEdit && !onDelete) return null;

  return (
    <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(content);
          }}
          className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
          title="编辑"
        >
          <PencilIcon className="h-3.5 w-3.5" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(content);
          }}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
          title="删除"
        >
          <TrashIcon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}