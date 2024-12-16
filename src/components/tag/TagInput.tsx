import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { Tag } from '../../types';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function TagInput({
  tags,
  onTagsChange,
  placeholder = '输入标签并按回车添加',
  className = ''
}: TagInputProps) {
  const { tags: storeTags } = useStore();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = storeTags.filter(tag =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !tags.includes(tag.name)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, storeTags, tags]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleAddTag(suggestions[selectedIndex].name);
      } else if (inputValue.trim()) {
        handleAddTag(inputValue.trim());
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleAddTag = (tagName: string) => {
    if (!tags.includes(tagName)) {
      onTagsChange([...tags, tagName]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue.trim() && setShowSuggestions(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
      />

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
        >
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
            {suggestions.map((tag, index) => (
              <li
                key={tag.id}
                className={`cursor-pointer select-none px-3 py-2 text-sm hover:bg-blue-50
                  ${index === selectedIndex ? 'bg-blue-50' : ''}`}
                onClick={() => handleAddTag(tag.name)}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}