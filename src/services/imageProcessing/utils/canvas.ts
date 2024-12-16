/**
 * Canvas utilities for image processing
 */
export async function createOffscreenCanvas(width: number, height: number) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d', {
    alpha: true,
    desynchronized: true,
    willReadFrequently: true
  });

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  return { canvas, ctx };
}

export function getOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  let width = originalWidth;
  let height = originalHeight;

  // Scale down if width exceeds maximum
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }

  // Scale down if height still exceeds maximum
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }

  return {
    width: Math.floor(width),
    height: Math.floor(height)
  };
}