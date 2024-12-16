import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useContentManagement } from '../hooks/useContentManagement';
import { useContentCapture } from '../hooks/useContentCapture';
import LoadingOverlay from '../components/common/LoadingOverlay';
import Button from '../components/common/Button';
import { Content } from '../types';

// Lazy load components
const ContentList = React.lazy(() => import('../components/content/ContentList'));
const ContentViewer = React.lazy(() => import('../components/content/ContentViewer'));
const ContentEditor = React.lazy(() => import('../components/content/ContentEditor'));
const UploadButton = React.lazy(() => import('../components/upload/UploadButton'));

export default function Contents() {
  const location = useLocation();
  const { contents, updateContent, deleteContent, isLoading } = useContentManagement();
  const { captureText, isCapturing } = useContentCapture();
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle navigation from search results
  useEffect(() => {
    const state = location.state as { selectedContent?: Content };
    if (state?.selectedContent) {
      setSelectedContent(state.selectedContent);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleQuickCapture = async () => {
    const text = await navigator.clipboard.readText();
    await captureText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">内容列表</h1>
        <div className="flex gap-2">
          <Suspense fallback={<Button disabled>加载中...</Button>}>
            <UploadButton />
          </Suspense>
          <Button
            onClick={handleQuickCapture}
            isLoading={isCapturing}
          >
            快速捕获
          </Button>
        </div>
      </div>

      <Suspense fallback={<LoadingOverlay message="加载内容列表..." />}>
        <ContentList
          contents={contents}
          onContentClick={setSelectedContent}
          onEdit={(content) => {
            setSelectedContent(content);
            setIsEditing(true);
          }}
          onDelete={deleteContent}
          isLoading={isLoading}
        />
      </Suspense>

      {selectedContent && !isEditing && (
        <Suspense fallback={<LoadingOverlay message="加载内容详情..." />}>
          <ContentViewer
            content={selectedContent}
            onClose={() => setSelectedContent(null)}
            onEdit={(content) => {
              setSelectedContent(content);
              setIsEditing(true);
            }}
            onDelete={deleteContent}
          />
        </Suspense>
      )}

      {selectedContent && isEditing && (
        <Suspense fallback={<LoadingOverlay message="加载编辑器..." />}>
          <ContentEditor
            content={selectedContent}
            onSave={async (updatedContent) => {
              await updateContent(updatedContent.id, updatedContent);
              setIsEditing(false);
              setSelectedContent(null);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </Suspense>
      )}
    </div>
  );
}