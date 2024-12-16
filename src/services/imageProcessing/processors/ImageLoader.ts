/**
 * Handles image loading with advanced error handling
 */
export class ImageLoader {
  static async load(imageData: string): Promise<ImageBitmap> {
    try {
      const blob = await this.dataURLtoBlob(imageData);
      return await createImageBitmap(blob, {
        imageOrientation: 'from-image',
        premultiplyAlpha: 'premultiply',
        colorSpaceConversion: 'default'
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static async dataURLtoBlob(dataURL: string): Promise<Blob> {
    try {
      const response = await fetch(dataURL);
      return await response.blob();
    } catch (error) {
      throw new Error('Failed to convert data URL to blob');
    }
  }

  private static handleError(error: unknown): Error {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Error(`Image loading failed: ${message}`);
  }
}