import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { Content, Task } from '../types';
import { debounce } from 'lodash';

interface SearchResults {
  contents: Content[];
  tasks: Task[];
}

export function useSearch() {
  const { contents, tasks } = useStore();
  const [results, setResults] = useState<SearchResults>({ contents: [], tasks: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const search = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setResults({ contents: [], tasks: [] });
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      const searchTerm = query.toLowerCase();

      // Search in contents
      const matchedContents = contents.filter(content => 
        content.title.toLowerCase().includes(searchTerm) ||
        content.content.toLowerCase().includes(searchTerm) ||
        content.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );

      // Search in tasks
      const matchedTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description || '').toLowerCase().includes(searchTerm)
      );

      setResults({ contents: matchedContents, tasks: matchedTasks });
      setShowResults(true);
      setIsSearching(false);
    }, 300),
    [contents, tasks]
  );

  const closeResults = useCallback(() => {
    setShowResults(false);
    setResults({ contents: [], tasks: [] });
  }, []);

  return {
    search,
    results,
    isSearching,
    showResults,
    closeResults
  };
}