/**
 * Handles image compression with quality control
 */
export class ImageCompressor {
  static async compress(
    image: ImageBitmap,
    quality: number
  ): Promise<string> {
    try {
      // Create canvas matching image dimensions
      const canvas = new OffscreenCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Draw image
      ctx.drawImage(image, 0, 0);

      // Convert to blob with compression
      const blob = await canvas.convertToBlob({
        type: 'image/jpeg',
        quality: quality
      });

      // Convert to data URL
      return await this.blobToDataURL(blob);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to convert blob to data URL'));
      reader.readAsDataURL(blob);
    });
  }

  private static handleError(error: unknown): Error {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Error(`Image compression failed: ${message}`);
  }
}