import { useState, useCallback, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../../hooks/useSearch';
import SearchResults from './SearchResults';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { search, results, isSearching, showResults, closeResults } = useSearch();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
  }, [search]);

  // Handle Escape key to close search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeResults();
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeResults]);

  return (
    <>
      <div className="relative w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="搜索内容或任务..."
            value={query}
            onChange={handleChange}
          />
        </div>
        {isSearching && (
          <div className="absolute right-3 top-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>

      {showResults && (
        <SearchResults
          contents={results.contents}
          tasks={results.tasks}
          onClose={closeResults}
        />
      )}
    </>
  );
}