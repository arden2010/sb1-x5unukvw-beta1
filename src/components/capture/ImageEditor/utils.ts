export function validateCrop(completedCrop: any): boolean {
  if (!completedCrop) return false;
  
  // Check if crop dimensions are valid
  const { width, height, x, y } = completedCrop;
  const isValidDimension = (dim: number) => typeof dim === 'number' && dim > 0;
  const isValidPosition = (pos: number) => typeof pos === 'number' && pos >= 0;
  
  return (
    isValidDimension(width) &&
    isValidDimension(height) &&
    isValidPosition(x) &&
    isValidPosition(y)
  );
}

export function getCroppedImage(
  image: HTMLImageElement,
  crop: any
): string | null {
  try {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Failed to crop image:', error);
    return null;
  }
}