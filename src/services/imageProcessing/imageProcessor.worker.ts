/// <reference lib="webworker" />

import { processImage } from './processors/imageProcessor';
import { dataURItoBlob } from './utils/dataConversion';
import { WorkerMessage, WorkerResponse } from './types';

const ctx: Worker = self as any;

ctx.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { imageData, options } = e.data;

  try {
    const result = await processImage(imageData, options, (progress) => {
      ctx.postMessage({ type: 'progress', value: progress });
    });

    ctx.postMessage({ 
      type: 'complete',
      result 
    });
  } catch (error) {
    ctx.postMessage({ 
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export type { WorkerMessage, WorkerResponse };