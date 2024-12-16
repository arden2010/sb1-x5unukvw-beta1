import { CompressOptions, WorkerMessage, WorkerResponse } from '../services/imageProcessing/types';

export async function compressImage(
  dataUrl: string,
  options: CompressOptions = { maxWidth: 1920, maxHeight: 1080, quality: 0.8 },
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    // 动态创建 Worker
    const worker = new Worker(
      new URL('../services/imageProcessing/imageProcessor.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { type, result, error, value } = e.data;

      switch (type) {
        case 'progress':
          onProgress?.(value);
          break;
        case 'complete':
          worker.terminate();
          resolve(result);
          break;
        case 'error':
          worker.terminate();
          reject(new Error(error));
          break;
      }
    };

    worker.onerror = (error) => {
      worker.terminate();
      reject(error);
    };

    const message: WorkerMessage = { imageData: dataUrl, options };
    worker.postMessage(message);
  });
}