import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { ContentCaptureService } from '../services/contentCapture';
import { useAutoTaskExtraction } from './useAutoTaskExtraction';
import { toast } from 'react-hot-toast';
import { Content } from '../types';

export function useContentCapture() {
  const { addContent } = useStore();
  const { extractAndCreateTasks } = useAutoTaskExtraction();
  const [isCapturing, setIsCapturing] = useState(false);
  const [progress, setProgress] = useState(0);

  const captureImage = useCallback(async (imageData: string, metadata = {}): Promise<Content | null> => {
    if (!imageData) {
      toast.error('无效的图片数据');
      return null;
    }

    setIsCapturing(true);
    setProgress(0);

    try {
      // Process image and create content
      setProgress(30);
      const content = await ContentCaptureService.captureImage(imageData, metadata);
      
      // Store content
      setProgress(60);
      await addContent(content);
      
      // Extract tasks if enabled
      setProgress(80);
      const tasks = await extractAndCreateTasks(content);
      
      setProgress(100);
      
      // Show success message
      if (tasks.length > 0) {
        toast.success(`已保存图片并提取 ${tasks.length} 个任务`);
      } else {
        toast.success('图片已保存');
      }
      
      return content;
    } catch (error) {
      console.error('Image capture failed:', error);
      toast.error('处理图片失败，请重试');
      return null;
    } finally {
      setIsCapturing(false);
      setProgress(0);
    }
  }, [addContent, extractAndCreateTasks]);

  const captureText = useCallback(async (text: string): Promise<Content | null> => {
    if (!text?.trim()) {
      toast.error('内容不能为空');
      return null;
    }
    
    setIsCapturing(true);
    setProgress(0);

    try {
      setProgress(30);
      const content = await ContentCaptureService.captureText(text);
      
      setProgress(60);
      await addContent(content);
      
      setProgress(80);
      const tasks = await extractAndCreateTasks(content);
      
      setProgress(100);
      
      if (tasks.length > 0) {
        toast.success(`已保存内容并提取 ${tasks.length} 个任务`);
      } else {
        toast.success('内容已保存');
      }
      
      return content;
    } catch (error) {
      console.error('Text capture failed:', error);
      toast.error('保存内容失败');
      return null;
    } finally {
      setIsCapturing(false);
      setProgress(0);
    }
  }, [addContent, extractAndCreateTasks]);

  return {
    captureText,
    captureImage,
    isCapturing,
    progress
  };
}