export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Enable cross-origin image loading
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    
    // Add timeout
    const timeout = setTimeout(() => {
      img.src = '';
      reject(new Error('Image loading timeout'));
    }, 30000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };

    img.src = src;
  });
}

export function validateImage(img: HTMLImageElement): boolean {
  return (
    img.complete &&
    img.naturalWidth !== 0 &&
    img.naturalHeight !== 0
  );
}