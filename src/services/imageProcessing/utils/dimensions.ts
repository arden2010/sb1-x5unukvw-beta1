import { ImageDimensions } from '../types';

export function calculateDimensions(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): ImageDimensions {
  let newWidth = width;
  let newHeight = height;

  // Maintain aspect ratio while scaling down
  if (newWidth > maxWidth) {
    newHeight = Math.round((newHeight * maxWidth) / newWidth);
    newWidth = maxWidth;
  }

  if (newHeight > maxHeight) {
    newWidth = Math.round((newWidth * maxHeight) / newHeight);
    newHeight = maxHeight;
  }

  // Ensure minimum dimensions
  newWidth = Math.max(1, Math.floor(newWidth));
  newHeight = Math.max(1, Math.floor(newHeight));

  return { width: newWidth, height: newHeight };
}