import { useState, useCallback } from 'react';
import { Content } from '../types';

export function useContentViewer() {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = useCallback((content: Content) => {
    setSelectedContent(content);
    setIsEditing(false);
  }, []);

  const handleEdit = useCallback((content: Content) => {
    setSelectedContent(content);
    setIsEditing(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedContent(null);
    setIsEditing(false);
  }, []);

  return {
    selectedContent,
    isEditing,
    handleView,
    handleEdit,
    handleClose
  };
}