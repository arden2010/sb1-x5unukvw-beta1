import { useContentManagement } from '../../hooks/useContentManagement';
import { useContentCapture } from '../../hooks/useContentCapture';
import { useContentViewer } from '../../hooks/useContentViewer';
import ContentList from './components/ContentList';
import ContentViewer from './components/ContentViewer';
import ContentEditor from './components/ContentEditor';
import ContentAnalysis from '../../components/content/ContentAnalysis';
import Button from '../../components/common/Button';

export default function Contents() {
  const { contents, updateContent, deleteContent } = useContentManagement();
  const { captureText, isCapturing } = useContentCapture();
  const { 
    selectedContent, 
    isEditing, 
    handleView, 
    handleEdit, 
    handleClose 
  } = useContentViewer();

  const handleQuickCapture = async () => {
    const text = await navigator.clipboard.readText();
    await captureText(text);
  };

  const handleSave = async (updatedContent: Content) => {
    await updateContent(updatedContent.id, updatedContent);
    handleClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">内容列表</h1>
        <Button
          onClick={handleQuickCapture}
          isLoading={isCapturing}
        >
          快速捕获
        </Button>
      </div>

      <ContentAnalysis contents={contents} />

      <ContentList
        contents={contents}
        onContentClick={handleView}
        onEdit={handleEdit}
        onDelete={deleteContent}
      />

      {selectedContent && !isEditing && (
        <ContentViewer
          content={selectedContent}
          onClose={handleClose}
          onEdit={handleEdit}
          onDelete={deleteContent}
        />
      )}

      {selectedContent && isEditing && (
        <ContentEditor
          content={selectedContent}
          onSave={handleSave}
          onCancel={handleClose}
        />
      )}
    </div>
  );
}