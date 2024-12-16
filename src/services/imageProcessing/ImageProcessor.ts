import { CompressOptions } from './types';
import { createCanvas } from './utils/canvas';
import { dataURItoBlob, blobToDataURI } from './utils/dataConversion';

export class ImageProcessor {
  static async compress(
    imageData: string,
    options: CompressOptions = { maxWidth: 1920, maxHeight: 1080, quality: 0.8 }
  ): Promise<string> {
    try {
      // Load image
      const img = await this.loadImage(imageData);
      
      // Calculate dimensions
      const { width, height } = this.calculateDimensions(
        img.width,
        img.height,
        options.maxWidth,
        options.maxHeight
      );

      // Create canvas and compress
      const { canvas, ctx } = createCanvas(width, height);
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob with compression
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          blob => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
          'image/jpeg',
          options.quality
        );
      });

      // Convert back to data URI
      return await blobToDataURI(blob);
    } catch (error) {
      console.error('Image compression failed:', error);
      throw new Error('Failed to compress image');
    }
  }

  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = src;
    });
  }

  private static calculateDimensions(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    let newWidth = width;
    let newHeight = height;

    // Scale down if width exceeds maximum
    if (newWidth > maxWidth) {
      newHeight = (newHeight * maxWidth) / newWidth;
      newWidth = maxWidth;
    }

    // Scale down if height still exceeds maximum
    if (newHeight > maxHeight) {
      newWidth = (newWidth * maxHeight) / newHeight;
      newHeight = maxHeight;
    }

    return {
      width: Math.floor(newWidth),
      height: Math.floor(newHeight)
    };
  }
}