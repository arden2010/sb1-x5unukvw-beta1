import { CompressOptions } from '../types';
import { dataURItoBlob } from '../utils/dataConversion';
import { createOffscreenCanvas } from '../utils/canvas';

export async function processImage(
  imageData: string,
  options: CompressOptions,
  onProgress?: (progress: number) => void
): Promise<string> {
  // 1. 解码图片
  const img = await createImageBitmap(dataURItoBlob(imageData));
  onProgress?.(0.2);

  // 2. 创建并配置 canvas
  const { canvas, ctx } = createOffscreenCanvas(img.width, img.height);
  onProgress?.(0.4);

  // 3. 绘制图片
  ctx.drawImage(img, 0, 0);
  onProgress?.(0.6);

  // 4. 压缩图片
  const blob = await canvas.convertToBlob({
    type: 'image/jpeg',
    quality: options.quality || 0.8
  });
  onProgress?.(0.8);

  // 5. 转换为 base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}