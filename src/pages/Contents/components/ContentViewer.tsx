import React, { useCallback } from 'react';
import { Content } from '../../../types';
import { formatDateTime } from '../../../utils/date';
import { TagList } from '../../../components/tag/TagList';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ContentViewerProps {
  content: Content;
  onClose: () => void;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
}

export function ContentViewer({ content, onClose, onEdit, onDelete }: ContentViewerProps) {
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    // 阻止事件冒泡，确保事件不会传播到背景
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleDelete = () => {
    onDelete?.(content);
  };

  // 阻止内部元素的双击事件冒泡
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative"
        onDoubleClick={handleDoubleClick}
      >
        <div className="px-6 py-4 border-b border-gray-200" onDoubleClick={stopPropagation}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">查看内容</h3>
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
          <p className="mt-1 text-sm text-gray-500">双击对话框可关闭</p>
        </div>

        <div 
          className="flex-1 overflow-y-auto p-6"
          onDoubleClick={stopPropagation}
        >
          {content.type === 'image' && content.metadata.originalImage && (
            <div className="mb-4">
              <img
                src={content.metadata.originalImage}
                alt={content.title}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{content.content}</p>
          </div>
          
          <div className="mt-4">
            <TagList tags={content.tags.map(tag => ({ id: tag, name: tag, color: 'blue' }))} />
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            创建时间：{formatDateTime(content.createdAt)}
          </div>
        </div>

        <div 
          className="absolute bottom-4 right-4 flex space-x-2"
          onDoubleClick={stopPropagation}
        >
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
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
              title="删除"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}