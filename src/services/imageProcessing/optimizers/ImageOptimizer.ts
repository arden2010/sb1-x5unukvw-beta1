import { CompressOptions } from '../types';
import { createCanvas } from '../utils/canvas';
import { loadImage } from '../utils/image';
import { calculateDimensions } from '../utils/dimensions';

export class ImageOptimizer {
  static async optimize(
    imageData: string,
    options: CompressOptions = {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.8
    }
  ): Promise<string> {
    // 1. Load image
    const img = await loadImage(imageData);

    // 2. Calculate optimal dimensions
    const { width, height } = calculateDimensions(
      img.naturalWidth,
      img.naturalHeight,
      options.maxWidth,
      options.maxHeight
    );

    // 3. Create optimized canvas
    const { canvas, ctx } = createCanvas(width, height);

    // 4. Draw with high quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);

    // 5. Compress and return
    return canvas.toDataURL('image/jpeg', options.quality);
  }

  static async createThumbnail(
    imageData: string,
    maxSize: number = 300
  ): Promise<string> {
    const img = await loadImage(imageData);
    const { width, height } = calculateDimensions(
      img.naturalWidth,
      img.naturalHeight,
      maxSize,
      maxSize
    );

    const { canvas, ctx } = createCanvas(width, height);
    ctx.drawImage(img, 0, 0, width, height);
    
    return canvas.toDataURL('image/jpeg', 0.7);
  }
}