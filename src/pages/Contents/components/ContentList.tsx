import React from 'react';
import { Content } from '../../../types';
import { ContentCard } from './ContentCard';

interface ContentListProps {
  contents: Content[];
  onContentClick: (content: Content) => void;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
}

export function ContentList({ contents, onContentClick, onEdit, onDelete }: ContentListProps) {
  const sortedContents = [...contents].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] pr-2">
      {sortedContents.map((content) => (
        <ContentCard
          key={content.id}
          content={content}
          onClick={onContentClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {sortedContents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无内容</p>
          <p className="text-sm text-gray-400 mt-2">
            使用右下角的按钮开始捕获内容，或直接复制文本自动保存
          </p>
        </div>
      )}
    </div>
  );
}