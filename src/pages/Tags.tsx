import React, { useState } from 'react';
import { useTagManagement } from '../hooks/useTagManagement';
import { useTagFilter } from '../hooks/useTagFilter';
import TagList from '../components/tag/TagList';
import ContentList from '../components/content/ContentList';
import Button from '../components/common/Button';

export default function Tags() {
  const { tags, createTag, deleteTag, isProcessing } = useTagManagement();
  const { selectedTag, filteredContents, filterByTag } = useTagFilter();
  const [newTagName, setNewTagName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagName.trim()) {
      await createTag(newTagName.trim());
      setNewTagName('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">标签管理</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="输入标签名称"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <Button type="submit" isLoading={isProcessing}>
          添加标签
        </Button>
      </form>

      <div className="bg-white p-4 rounded-lg shadow">
        {tags && tags.length > 0 ? (
          <TagList
            tags={tags}
            onTagClick={(tag) => filterByTag(tag.name)}
            onTagDelete={deleteTag}
            selectedTag={selectedTag}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无标签，请在上方添加标签</p>
          </div>
        )}
      </div>

      {selectedTag && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">
            包含标签 "{selectedTag}" 的内容
          </h2>
          <ContentList
            contents={filteredContents}
            onContentClick={() => {}}
          />
        </div>
      )}
    </div>
  );
}