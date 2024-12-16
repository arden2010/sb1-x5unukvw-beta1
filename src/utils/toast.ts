import { toast } from 'react-hot-toast';
import { ToastContent } from '../components/toast/ToastContent';

export const showToast = {
  success: (message: string, options?: { onUndo?: () => void }) => {
    return toast.success(
      (t) => ToastContent({ message, onUndo: options?.onUndo, toast: t }),
      {
        duration: 5000,
        position: 'bottom-right'
      }
    );
  },
  error: (message: string) => {
    return toast.error(message, {
      duration: 5000,
      position: 'bottom-right'
    });
  }
};