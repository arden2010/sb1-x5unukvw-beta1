/**
 * Calculates optimal dimensions while maintaining aspect ratio
 */
export class DimensionCalculator {
  static calculate(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    // Validate input
    if (!this.isValidInput(width, height, maxWidth, maxHeight)) {
      throw new Error('Invalid dimensions');
    }

    let newWidth = width;
    let newHeight = height;

    // Scale down if width exceeds maximum
    if (newWidth > maxWidth) {
      newHeight = Math.round((newHeight * maxWidth) / newWidth);
      newWidth = maxWidth;
    }

    // Scale down if height still exceeds maximum
    if (newHeight > maxHeight) {
      newWidth = Math.round((newWidth * maxHeight) / newHeight);
      newHeight = maxHeight;
    }

    // Ensure minimum dimensions
    return {
      width: Math.max(1, Math.floor(newWidth)),
      height: Math.max(1, Math.floor(newHeight))
    };
  }

  private static isValidInput(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
  ): boolean {
    return (
      Number.isFinite(width) && width > 0 &&
      Number.isFinite(height) && height > 0 &&
      Number.isFinite(maxWidth) && maxWidth > 0 &&
      Number.isFinite(maxHeight) && maxHeight > 0
    );
  }
}