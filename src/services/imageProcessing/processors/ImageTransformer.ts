/**
 * Handles image transformations like resizing
 */
import { CompressOptions } from '../types';
import { createOffscreenCanvas } from '../utils/canvas';
import { ImageValidator } from '../utils/validation';
import { DimensionCalculator } from '../utils/DimensionCalculator';

export class ImageTransformer {
  static async transform(
    image: ImageBitmap,
    options: CompressOptions
  ): Promise<ImageBitmap> {
    try {
      // Calculate optimal dimensions
      const dimensions = DimensionCalculator.calculate(
        image.width,
        image.height,
        options.maxWidth,
        options.maxHeight
      );

      // Validate dimensions
      ImageValidator.validateDimensions(dimensions.width, dimensions.height);

      // Create canvas with new dimensions
      const { canvas, ctx } = await createOffscreenCanvas(
        dimensions.width,
        dimensions.height
      );

      // Draw with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);

      // Create new bitmap
      return createImageBitmap(canvas);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Error(`Image transformation failed: ${message}`);
  }
}