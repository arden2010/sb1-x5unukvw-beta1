import { Toast } from 'react-hot-toast';

interface ToastContentProps {
  message: string;
  onUndo?: () => void;
  toast: Toast;
}

export function ToastContent({ message, onUndo, toast }: ToastContentProps) {
  return (
    <div className="flex items-center gap-2">
      <span>{message}</span>
      {onUndo && (
        <button
          onClick={() => {
            onUndo();
            toast.dismiss();
          }}
          className="px-2 py-1 text-xs bg-white rounded shadow hover:bg-gray-50"
        >
          撤销
        </button>
      )}
    </div>
  );
}