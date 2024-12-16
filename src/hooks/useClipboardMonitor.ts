import { useEffect, useCallback } from 'react';
import { useContentCapture } from './useContentCapture';
import { toast } from 'react-hot-toast';

export function useClipboardMonitor() {
  const { captureText, isCapturing } = useContentCapture();

  const handleClipboardCapture = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        await captureText(text);
      } else {
        toast.error('剪贴板中没有文本内容');
      }
    } catch (error) {
      console.error('Failed to capture clipboard:', error);
      toast.error('无法读取剪贴板内容');
    }
  }, [captureText]);

  useEffect(() => {
    // Listen for Ctrl+V or Command+V
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        // Only handle if not in an input or textarea
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          e.preventDefault();
          await handleClipboardCapture();
        }
      }
    };

    // Listen for paste event
    const handlePaste = async (e: ClipboardEvent) => {
      // Only handle if not in an input or textarea
      if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text');
        if (text?.trim()) {
          await captureText(text);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('paste', handlePaste);
    };
  }, [handleClipboardCapture]);

  return {
    handleClipboardCapture,
    isCapturing
  };
}