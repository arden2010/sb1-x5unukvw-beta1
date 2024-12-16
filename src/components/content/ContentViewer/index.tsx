import React, { useEffect, useCallback } from 'react';
import { Content } from '../../../types';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';
import ContentActions from './ContentActions';
import { useStore } from '../../../store';

interface ContentViewerProps {
  content: Content;
  onClose: () => void;
  onEdit?: (content: Content) => void;
  onDelete?: (content: Content) => void;
}

export default function ContentViewer({ content, onClose, onEdit, onDelete }: ContentViewerProps) {
  const { settings } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative">
        <ContentHeader onClose={onClose} aiEnabled={settings.ai.enabled} />
        <ContentBody content={content} />
        <ContentActions 
          content={content}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}