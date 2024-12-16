import { useCallback, useEffect } from 'react';
import { Content } from '../../types';
import { formatDateTime } from '../../utils/date';
import TagList from '../tag/TagList';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store';

interface ContentViewerProps {
  content: Content;
  onClose: () => void;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
}

export default function ContentViewer({ content, onClose, onEdit, onDelete }: ContentViewerProps) {
  const { settings } = useStore();

  const handleContentDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-gray-900">查看内容</h3>
              {settings.ai.enabled && (
                <SparklesIcon className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
              title="关闭 (Esc)"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">双击内容区域或按 Esc 键关闭</p>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto p-6 cursor-pointer"
          onDoubleClick={handleContentDoubleClick}
        >
          {content.type === 'image' && content.metadata.originalImage && (
            <div className="mb-4">
              <img
                src={content.metadata.originalImage}
                alt={content.title}
                className="max-w-full h-auto rounded-lg"
                onDoubleClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{content.content}</p>
          </div>
          
          <div className="mt-4">
            <TagList 
              tags={content.tags.map(tag => ({ id: tag, name: tag, color: 'blue' }))} 
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            创建时间：{formatDateTime(content.createdAt)}
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(content)}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
              title="编辑"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(content)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
              title="删除"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}