import Button from '../../common/Button';

interface FooterProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function Footer({ onSave, onCancel }: FooterProps) {
  return (
    <div className="p-4 border-t border-gray-200 flex justify-end space-x-3 bg-white">
      <Button variant="secondary" onClick={onCancel}>
        取消
      </Button>
      <Button onClick={onSave}>
        确认并识别
      </Button>
    </div>
  );
}