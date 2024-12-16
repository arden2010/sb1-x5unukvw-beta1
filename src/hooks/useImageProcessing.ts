import { useState, useCallback } from 'react';
import { CompressOptions } from '../services/imageProcessing/types';

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export function useImageProcessing() {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    error: null
  });

  const processImage = useCallback(async (
    imageData: string,
    options: CompressOptions
  ): Promise<string> => {
    setState({ isProcessing: true, progress: 0, error: null });

    return new Promise((resolve, reject) => {
      const worker = new Worker(
        new URL('../services/imageProcessing/worker/imageProcessor.worker.ts', import.meta.url),
        { type: 'module' }
      );

      worker.onmessage = (e) => {
        const { type, result, error, value } = e.data;

        switch (type) {
          case 'start':
            setState(prev => ({ ...prev, progress: 0 }));
            break;

          case 'progress':
            setState(prev => ({ ...prev, progress: value }));
            break;

          case 'complete':
            setState({ isProcessing: false, progress: 100, error: null });
            worker.terminate();
            resolve(result);
            break;

          case 'error':
            setState({ isProcessing: false, progress: 0, error });
            worker.terminate();
            reject(new Error(error));
            break;
        }
      };

      worker.onerror = () => {
        const error = 'Worker failed to process image';
        setState({ isProcessing: false, progress: 0, error });
        worker.terminate();
        reject(new Error(error));
      };

      worker.postMessage({ imageData, options });
    });
  }, []);

  return {
    ...state,
    processImage
  };
}