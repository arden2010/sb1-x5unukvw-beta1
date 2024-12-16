import { useEffect } from 'react';
import { useScreenshotCapture } from './useScreenshotCapture';
import { useStore } from '../store';
import { toast } from 'react-hot-toast';

export function useKeyboardShortcuts() {
  const { settings } = useStore();
  const { captureScreen } = useScreenshotCapture();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Default screenshot shortcuts
      if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') || // Ctrl+Alt+A
          (e.ctrlKey && e.altKey && e.key === 'A')) { // QQ screenshot shortcut
        e.preventDefault();
        captureScreen();
        return;
      }

      // Custom shortcuts from settings
      if (settings?.shortcuts) {
        Object.entries(settings.shortcuts).forEach(([action, shortcut]) => {
          const keys = shortcut.split('+').map(k => k.trim().toLowerCase());
          const match = keys.every(key => {
            if (key === 'ctrl') return e.ctrlKey;
            if (key === 'alt') return e.altKey;
            if (key === 'shift') return e.shiftKey;
            return e.key.toLowerCase() === key;
          });

          if (match) {
            e.preventDefault();
            switch (action) {
              case 'screenshot':
                captureScreen();
                toast.success('快捷键触发截图');
                break;
              // Add more actions here
            }
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [captureScreen, settings]);
}