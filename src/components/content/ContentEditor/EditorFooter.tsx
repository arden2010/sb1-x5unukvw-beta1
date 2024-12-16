import Button from '../../common/Button';

interface EditorFooterProps {
  onCancel: () => void;
  isLoading?: boolean;
}

export default function EditorFooter({ onCancel, isLoading }: EditorFooterProps) {
  return (
    <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
      >
        取消
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
      >
        保存
      </Button>
    </div>
  );
}