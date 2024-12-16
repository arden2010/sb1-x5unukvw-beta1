/**
 * Image validation utilities
 */
export class ImageValidator {
  static isValidImageData(imageData: string): boolean {
    if (!imageData?.startsWith('data:image/')) {
      return false;
    }

    try {
      // Validate base64 content
      const [header, content] = imageData.split(',');
      if (!header || !content) {
        return false;
      }

      // Check for valid MIME type
      const mimeMatch = header.match(/^data:(image\/[a-zA-Z+]+);base64$/);
      if (!mimeMatch) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  static validateDimensions(width: number, height: number): void {
    if (!Number.isFinite(width) || !Number.isFinite(height) || 
        width <= 0 || height <= 0) {
      throw new Error('Invalid image dimensions');
    }
  }

  static validateOptions(options: any): void {
    if (!options?.maxWidth || !options?.maxHeight || 
        !Number.isFinite(options.quality) || 
        options.quality < 0 || options.quality > 1) {
      throw new Error('Invalid compression options');
    }
  }
}