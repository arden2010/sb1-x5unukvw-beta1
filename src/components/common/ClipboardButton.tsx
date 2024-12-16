import { useClipboardMonitor } from '../../hooks/useClipboardMonitor';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ClipboardButtonProps {
  className?: string;
}

export default function ClipboardButton({ className }: ClipboardButtonProps) {
  const { handleClipboardCapture, isCapturing } = useClipboardMonitor();

  return (
    <Button
      onClick={handleClipboardCapture}
      isLoading={isCapturing}
      className={className}
    >
      <ClipboardIcon className="h-5 w-5 mr-2" />
      从剪贴板获取
    </Button>
  );
}