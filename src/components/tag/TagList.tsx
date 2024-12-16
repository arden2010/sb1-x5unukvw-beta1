import { Tag } from '../../types';

interface TagListProps {
  tags: Tag[];
  onTagClick?: (tag: Tag) => void;
  onTagDelete?: (tag: Tag) => void;
  selectedTag?: string;
}

export default function TagList({ 
  tags, 
  onTagClick, 
  onTagDelete,
  selectedTag 
}: TagListProps) {
  const tagColorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={`
            inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
            cursor-pointer transition-all duration-200
            ${tagColorClasses[tag.color]}
            ${selectedTag === tag.name ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:opacity-80'}
          `}
          onClick={() => onTagClick?.(tag)}
        >
          {tag.name}
          {onTagDelete && (
            <button
              type="button"
              className="ml-1 hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                onTagDelete(tag);
              }}
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}