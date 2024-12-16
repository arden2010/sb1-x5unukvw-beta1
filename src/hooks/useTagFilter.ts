import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { Content } from '../types';

export function useTagFilter() {
  const { contents } = useStore();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredContents, setFilteredContents] = useState<Content[]>(contents);

  const filterByTag = useCallback((tagName: string) => {
    if (selectedTag === tagName) {
      // If clicking the same tag again, clear the filter
      setSelectedTag(null);
      setFilteredContents(contents);
    } else {
      // Filter contents by the selected tag
      setSelectedTag(tagName);
      setFilteredContents(contents.filter(content => 
        content.tags.includes(tagName)
      ));
    }
  }, [contents, selectedTag]);

  return {
    selectedTag,
    filteredContents,
    filterByTag
  };
}