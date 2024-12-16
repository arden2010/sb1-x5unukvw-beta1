import { CompressOptions } from './types';
import { ImageProcessor } from './processors/ImageProcessor';
import { ImageValidator } from './validators/ImageValidator';
import { ImageOptimizer } from './optimizers/ImageOptimizer';
import { toast } from 'react-hot-toast';

export class ImageService {
  static async process(
    imageData: string, 
    options?: CompressOptions,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      // 1. Validate input
      if (!ImageValidator.isValidDataUrl(imageData)) {
        throw new Error('Invalid image data');
      }
      onProgress?.(10);

      // 2. Pre-process image
      const preprocessed = await ImageProcessor.preprocess(imageData);
      onProgress?.(30);

      // 3. Optimize image
      const optimized = await ImageOptimizer.optimize(preprocessed, options);
      onProgress?.(70);

      // 4. Post-process and finalize
      const result = await ImageProcessor.postprocess(optimized);
      onProgress?.(100);

      return result;
    } catch (error) {
      console.error('Image processing failed:', error);
      toast.error('图片处理失败，请重试');
      throw error;
    }
  }
}