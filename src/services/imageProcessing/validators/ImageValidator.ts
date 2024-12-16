export class ImageValidator {
  static isValidDataUrl(dataUrl: string): boolean {
    if (!dataUrl) return false;

    try {
      // Check data URL format
      if (!dataUrl.startsWith('data:image/')) {
        return false;
      }

      // Validate base64 content
      const [header, content] = dataUrl.split(',');
      if (!header || !content) {
        return false;
      }

      // Check for valid MIME type
      const mimeMatch = header.match(/^data:(image\/[a-zA-Z+]+);base64$/);
      if (!mimeMatch) {
        return false;
      }

      return true;
    } catch (error) {
      console.warn('Image validation failed:', error);
      return false;
    }
  }

  static async validateDimensions(
    img: HTMLImageElement,
    minWidth = 1,
    minHeight = 1
  ): Promise<boolean> {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(
          img.naturalWidth >= minWidth && 
          img.naturalHeight >= minHeight
        );
      } else {
        img.onload = () => {
          resolve(
            img.naturalWidth >= minWidth && 
            img.naturalHeight >= minHeight
          );
        };
        img.onerror = () => resolve(false);
      }
    });
  }
}