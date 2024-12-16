import React, { useState, useEffect, useRef } from 'react';
import { Content } from '../../types';
import ContentCard from './ContentCard';
import LoadingOverlay from '../common/LoadingOverlay';
import { useVirtualizer } from '@tanstack/react-virtual';

interface ContentListProps {
  contents: Content[];
  onContentClick: (content: Content) => void;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
  isLoading?: boolean;
}

const PAGE_SIZE = 20;

export default function ContentList({ 
  contents, 
  onContentClick, 
  onEdit, 
  onDelete,
  isLoading 
}: ContentListProps) {
  const [displayedContents, setDisplayedContents] = useState<Content[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  // Sort contents by date once
  const sortedContents = React.useMemo(() => 
    [...contents].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  , [contents]);

  // Virtual list setup
  const rowVirtualizer = useVirtualizer({
    count: displayedContents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimated height of each content card
    overscan: 5 // Number of items to render outside of the visible area
  });

  // Load initial data
  useEffect(() => {
    setDisplayedContents(sortedContents.slice(0, PAGE_SIZE));
  }, [sortedContents]);

  // Handle infinite scroll
  const loadMore = async () => {
    if (isLoadingMore || displayedContents.length >= sortedContents.length) return;

    setIsLoadingMore(true);
    try {
      // Load next batch asynchronously
      await new Promise(resolve => setTimeout(resolve, 0));
      const nextBatch = sortedContents.slice(
        displayedContents.length,
        displayedContents.length + PAGE_SIZE
      );
      setDisplayedContents(prev => [...prev, ...nextBatch]);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    const loader = document.querySelector('#content-loader');
    if (loader) observer.observe(loader);

    return () => observer.disconnect();
  }, [displayedContents.length]);

  if (isLoading && displayedContents.length === 0) {
    return <LoadingOverlay message="加载内容列表..." />;
  }

  return (
    <div 
      ref={parentRef}
      className="h-[calc(100vh-12rem)] overflow-auto pr-2"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const content = displayedContents[virtualRow.index];
          return (
            <div
              key={content.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ContentCard
                content={content}
                onClick={onContentClick}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          );
        })}
      </div>

      {displayedContents.length < sortedContents.length && (
        <div id="content-loader" className="py-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {sortedContents.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无内容</p>
          <p className="text-sm text-gray-400 mt-2">
            使用右上角的按钮开始添加内容，或直接复制文本自动保存
          </p>
        </div>
      )}
    </div>
  );
}