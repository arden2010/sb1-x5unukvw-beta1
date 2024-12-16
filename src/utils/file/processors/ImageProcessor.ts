/**
 * Image file processing
 */
import { ProcessedFile } from '../types';
import { ImageValidator } from '../validators/ImageValidator';
import { createThumbnail } from '../utils/thumbnail';

export class ImageProcessor {
  static async process(file: File): Promise<ProcessedFile> {
    try {
      // Validate image file
      ImageValidator.validate(file);

      // Read file as data URL
      const imageData = await this.readAsDataURL(file);
      
      // Create thumbnail
      const thumbnail = await createThumbnail(file);

      return {
        type: 'image',
        content: imageData,
        metadata: {
          originalName: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          thumbnail
        }
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  }

  private static handleError(error: unknown): Error {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Error(`Image processing failed: ${message}`);
  }
}