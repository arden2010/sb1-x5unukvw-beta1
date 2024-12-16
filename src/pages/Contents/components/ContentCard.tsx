import React from 'react';
import { Content } from '../../../types';
import { formatRelativeTime } from '../../../utils/date';
import { DocumentTextIcon, PhotoIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ContentCardProps {
  content: Content;
  onClick?: (content: Content) => void;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
}

export function ContentCard({ content, onClick, onEdit, onDelete }: ContentCardProps) {
  const icon = content.type === 'image' ? PhotoIcon : DocumentTextIcon;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(content);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer relative group"
      onClick={() => onClick?.(content)}
    >
      <div className="p-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {React.createElement(icon, {
              className: "h-4 w-4 text-gray-400",
              'aria-hidden': true
            })}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 text-sm leading-relaxed line-clamp-3">
              {content.content}
            </p>
            
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {content.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700"
                >
                  {tag}
                </span>
              ))}
              <span className="text-[10px] text-gray-500">
                {formatRelativeTime(content.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

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
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
            title="删除"
          >
            <TrashIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}