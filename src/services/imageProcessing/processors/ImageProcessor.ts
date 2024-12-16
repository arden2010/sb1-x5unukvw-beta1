/**
 * Main processor for handling image transformations
 */
import { CompressOptions } from '../types';
import { ImageValidator } from '../utils/validation';
import { ImageCompressor } from './ImageCompressor';
import { ImageLoader } from './ImageLoader';
import { ImageTransformer } from './ImageTransformer';

export class ImageProcessor {
  static async process(
    imageData: string,
    options: CompressOptions,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      // Validate input
      if (!imageData?.startsWith('data:image/')) {
        throw new Error('Invalid image data');
      }
      onProgress?.(10);

      // Load image
      const image = await ImageLoader.load(imageData);
      onProgress?.(30);

      // Transform image
      const transformed = await ImageTransformer.transform(image, options);
      onProgress?.(60);

      // Compress image
      const compressed = await ImageCompressor.compress(transformed, options.quality);
      onProgress?.(90);

      return compressed;
    } catch (error) {
      console.error('Image processing failed:', error);
      throw new Error('Failed to process image');
    }
  }
}