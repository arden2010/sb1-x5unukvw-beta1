import { useState, useCallback } from 'react';
import { useContentCapture } from './useContentCapture';
import { ScreenshotService } from '../services/screenshot/ScreenshotService';
import { toast } from 'react-hot-toast';

interface ScreenshotState {
  isCapturing: boolean;
  isProcessing: boolean;
  isEditing: boolean;
  currentImage: string | null;
  progress: number;
}

export function useScreenshotCapture() {
  const { captureImage } = useContentCapture();
  const [state, setState] = useState<ScreenshotState>({
    isCapturing: false,
    isProcessing: false,
    isEditing: false,
    currentImage: null,
    progress: 0
  });

  const updateState = useCallback((updates: Partial<ScreenshotState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      isCapturing: false,
      isProcessing: false,
      isEditing: false,
      currentImage: null,
      progress: 0
    });
  }, []);

  const captureScreen = useCallback(async () => {
    updateState({ isCapturing: true, progress: 10 });

    try {
      // Capture screenshot
      const screenshot = await ScreenshotService.capture();
      if (!screenshot) {
        throw new Error('Screenshot capture failed');
      }

      // Update state with captured image
      updateState({
        isCapturing: false,
        isEditing: true,
        currentImage: screenshot,
        progress: 80
      });
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      toast.error('截图失败，请重试');
      resetState();
    }
  }, [updateState, resetState]);

  const handleSaveImage = useCallback(async (imageData: string) => {
    updateState({ isProcessing: true, progress: 85 });

    try {
      // Save and process image
      await captureImage(imageData);
      
      // Reset state on success
      updateState({
        isProcessing: false,
        isEditing: false,
        currentImage: null,
        progress: 100
      });

      // Clear progress after animation
      setTimeout(() => {
        updateState({ progress: 0 });
      }, 500);

      toast.success('图片已保存');
    } catch (error) {
      console.error('Failed to save image:', error);
      toast.error('保存图片失败');
      resetState();
    }
  }, [captureImage, updateState, resetState]);

  return {
    ...state,
    captureScreen,
    handleSaveImage,
    handleCancel: resetState
  };
}