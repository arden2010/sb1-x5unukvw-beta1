import { useState } from 'react';
import { Content } from '../../../types';
import EditorHeader from './EditorHeader';
import EditorForm from './EditorForm';
import EditorFooter from './EditorFooter';

interface ContentEditorProps {
  content: Content;
  onSave: (updatedContent: Content) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ContentEditor({
  content: initialContent,
  onSave,
  onCancel,
  isLoading
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden">
        <EditorHeader onClose={onCancel} />
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <EditorForm 
            content={content}
            onChange={setContent}
          />
          
          <EditorFooter 
            onCancel={onCancel}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}