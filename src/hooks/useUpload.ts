import { useState, useCallback } from 'react';
import { useContentCapture } from './useContentCapture';
import { processFile } from '../utils/fileProcessing';
import { toast } from 'react-hot-toast';

export function useUpload() {
  const { captureImage, captureText } = useContentCapture();
  const [isUploading, setIsUploading] = useState(false);

  const uploadFiles = useCallback(async (files: File[]) => {
    setIsUploading(true);
    let success = true;

    try {
      for (const file of files) {
        const processedFile = await processFile(file);
        
        if (processedFile.type === 'image') {
          await captureImage(processedFile.content);
        } else {
          await captureText(processedFile.content);
        }
        
        toast.success(`文件 ${file.name} 已上传`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('上传失败，请重试');
      success = false;
    } finally {
      setIsUploading(false);
    }

    return success;
  }, [captureImage, captureText]);

  return {
    uploadFiles,
    isUploading
  };
}