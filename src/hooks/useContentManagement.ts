import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../store';
import { Content } from '../types';
import { toast } from 'react-hot-toast';

export function useContentManagement() {
  const { 
    contents: storeContents, 
    addContent, 
    updateContent: storeUpdateContent, 
    removeContent,
    undoDelete,
    clearOldDeletedContents,
    deletedContents 
  } = useStore();

  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load contents asynchronously
  useEffect(() => {
    const loadContents = async () => {
      setIsLoading(true);
      try {
        // Simulate async loading to prevent UI blocking
        await new Promise(resolve => setTimeout(resolve, 0));
        setContents(storeContents);
      } finally {
        setIsLoading(false);
      }
    };
    loadContents();
  }, [storeContents]);

  // Periodically clean up old deleted contents
  useEffect(() => {
    const interval = setInterval(clearOldDeletedContents, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [clearOldDeletedContents]);

  const updateContent = useCallback(async (id: string, updates: Partial<Content>) => {
    setIsLoading(true);
    try {
      await storeUpdateContent(id, updates);
      toast.success('内容已更新');
    } catch (error) {
      console.error('Failed to update content:', error);
      toast.error('更新失败');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [storeUpdateContent]);

  const deleteContent = useCallback((content: Content) => {
    removeContent(content.id);
    
    toast.success('内容已删除', {
      duration: 5000,
      position: 'bottom-right',
      icon: '🗑️',
      id: `delete-${content.id}`,
      action: {
        label: '撤销',
        onClick: () => {
          undoDelete(content.id);
          toast.success('已恢复删除的内容');
        }
      }
    });
  }, [removeContent, undoDelete]);

  return {
    contents,
    addContent,
    updateContent,
    deleteContent,
    hasDeletedContents: deletedContents.length > 0,
    isLoading
  };
}