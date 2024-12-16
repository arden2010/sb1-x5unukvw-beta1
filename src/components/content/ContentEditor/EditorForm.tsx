import { Content } from '../../../types';
import TagList from '../../tag/TagList';
import TagInput from '../../tag/TagInput';
import { useState } from 'react';

interface EditorFormProps {
  content: Content;
  onChange: (content: Content) => void;
}

export default function EditorForm({ content, onChange }: EditorFormProps) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (tagName: string) => {
    if (!content.tags.includes(tagName)) {
      onChange({
        ...content,
        tags: [...content.tags, tagName]
      });
    }
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange({
      ...content,
      tags: content.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
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
            onChange={(e) => onChange({ ...content, title: e.target.value })}
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
            onChange={(e) => onChange({ ...content, content: e.target.value })}
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
            <TagInput
              value={newTag}
              onChange={setNewTag}
              onAddTag={handleAddTag}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}