import { useState } from 'react';
import { Content } from '../../../types';
import { formatDateTime } from '../../../utils/date';
import TagList from '../../tag/TagList';
import { useStore } from '../../../store';
import { Link } from 'react-router-dom';
import { ClipboardIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import ImageViewer from '../ImageViewer';

interface ContentBodyProps {
  content: Content;
}

export default function ContentBody({ content }: ContentBodyProps) {
  const { tasks } = useStore();
  const [showImageViewer, setShowImageViewer] = useState(false);
  
  const relatedTasks = tasks.filter(task => 
    task.relatedContentIds.includes(content.id)
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.content);
      toast.success('内容已复制到剪贴板');
    } catch (error) {
      console.error('Failed to copy content:', error);
      toast.error('复制失败，请重试');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* File metadata if it's an uploaded file */}
      {content.metadata.fileName && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DocumentIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">{content.metadata.fileName}</span>
          </div>
          {content.metadata.fileSize && (
            <div className="mt-1 text-xs text-gray-500">
              大小: {formatFileSize(content.metadata.fileSize)}
            </div>
          )}
        </div>
      )}

      {/* Image content */}
      {content.type === 'image' && content.metadata.originalImage && (
        <div className="mb-4">
          <img
            src={content.metadata.originalImage}
            alt={content.title}
            className="max-w-full h-auto rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity"
            onClick={() => setShowImageViewer(true)}
          />
        </div>
      )}

      {/* Text content */}
      <div className="prose max-w-none relative group">
        <button
          onClick={handleCopy}
          className="absolute right-0 top-0 p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100"
          title="复制内容"
        >
          <ClipboardIcon className="h-5 w-5" />
        </button>
        <p className="whitespace-pre-wrap pr-12">{content.content}</p>
      </div>

      {/* Related tasks */}
      {relatedTasks.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">相关任务</h4>
          <div className="space-y-2">
            {relatedTasks.map(task => (
              <Link
                key={task.id}
                to="/tasks"
                state={{ selectedTask: task }}
                className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    task.status === 'done' ? 'bg-green-500' :
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <span className="text-sm text-gray-900">{task.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="mt-4">
        <TagList 
          tags={content.tags.map(tag => ({ id: tag, name: tag, color: 'blue' }))} 
        />
      </div>

      {/* Creation time */}
      <div className="mt-4 text-sm text-gray-500">
        创建时间：{formatDateTime(content.createdAt)}
      </div>

      {/* Image viewer modal */}
      {showImageViewer && content.type === 'image' && content.metadata.originalImage && (
        <ImageViewer
          src={content.metadata.originalImage}
          alt={content.title}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}