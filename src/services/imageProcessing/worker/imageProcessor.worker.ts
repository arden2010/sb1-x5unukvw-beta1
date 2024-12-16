import { ImageCompressor } from '../processors/ImageCompressor';
import { CompressOptions } from '../types';

const ctx: Worker = self as any;

ctx.onmessage = async (e: MessageEvent) => {
  try {
    const { imageData, options } = e.data as {
      imageData: string;
      options: CompressOptions;
    };

    // Report start
    ctx.postMessage({ type: 'start' });

    // Process image
    const result = await ImageCompressor.compress(
      imageData,
      options,
      (progress) => ctx.postMessage({ type: 'progress', value: progress })
    );

    // Report success
    ctx.postMessage({ type: 'complete', result });
  } catch (error) {
    // Report error with details
    ctx.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export type {};