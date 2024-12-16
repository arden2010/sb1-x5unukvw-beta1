import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { Tag } from '../types';

const TAG_COLORS = [
  'blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray'
];

export function useTagManagement() {
  const { tags, addTag, updateTag, removeTag } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTag = useCallback(async (name: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      const color = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];
      const tag: Tag = {
        id: crypto.randomUUID(),
        name,
        color
      };
      
      await addTag(tag);
      return tag;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tag');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [addTag]);

  const deleteTag = useCallback(async (id: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      await removeTag(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tag');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [removeTag]);

  return {
    tags,
    createTag,
    deleteTag,
    isProcessing,
    error
  };
}