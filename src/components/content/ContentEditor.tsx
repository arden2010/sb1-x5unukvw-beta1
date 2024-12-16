import { useState } from 'react';
import { Content } from '../../types';
import Button from '../common/Button';
import TagList from '../tag/TagList';

interface ContentEditorProps {
  content: Content;
  onSave: (updatedContent: Content) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ContentEditor({
  content: initialContent,
  onSave,
  onCancel,
  isLoading
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!content.tags.includes(newTag.trim())) {
        setContent({
          ...content,
          tags: [...content.tags, newTag.trim()]
        });
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setContent({
      ...content,
      tags: content.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">编辑内容</h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">关闭</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSave(content);
          }}
          className="flex flex-col flex-1 overflow-hidden"
        >
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  标题
                </label>
                <input
                  type="text"
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  内容
                </label>
                <textarea
                  id="content"
                  value={content.content}
                  onChange={(e) => setContent({ ...content, content: e.target.value })}
                  rows={12}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  标签
                </label>
                <div className="mt-1">
                  <TagList
                    tags={content.tags.map(tag => ({ id: tag, name: tag, color: 'blue' }))}
                    onTagDelete={(tag) => handleRemoveTag(tag.name)}
                  />
                  <input
                    type="text"
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="输入标签并按回车添加"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fixed footer with buttons */}
          <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              取消
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}