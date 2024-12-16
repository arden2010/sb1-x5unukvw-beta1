import Button from '../../common/Button';

interface EditorFooterProps {
  onSave: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
  showProcessingText?: boolean;
}

export default function EditorFooter({ 
  onSave, 
  onCancel, 
  isProcessing,
  showProcessingText
}: EditorFooterProps) {
  return (
    <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-white">
      <div className="text-sm text-gray-500">
        {showProcessingText && !isProcessing && 
          '点击确认将对整张图片进行文字识别'
        }
      </div>
      <div className="flex space-x-3">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isProcessing}
        >
          取消
        </Button>
        <Button
          onClick={onSave}
          isLoading={isProcessing}
        >
          确认并识别
        </Button>
      </div>
    </div>
  );
}