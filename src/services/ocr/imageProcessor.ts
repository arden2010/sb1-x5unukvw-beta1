import { OCRService } from './ocrService';
import { compressImage } from '../../utils/imageProcessing';
import { Content } from '../../types';

export class ImageProcessor {
  static async process(imageData: string, metadata?: Record<string, any>): Promise<Content> {
    try {
      // 1. Compress image and run OCR in parallel
      const [compressedImage, ocrResult] = await Promise.all([
        compressImage(imageData, {
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.8
        }),
        OCRService.recognize(imageData)
      ]);

      const now = new Date().toISOString();
      
      return {
        id: crypto.randomUUID(),
        type: 'image',
        title: ocrResult.text.slice(0, 50) + (ocrResult.text.length > 50 ? '...' : ''),
        content: ocrResult.text,
        tags: metadata?.tags || [],
        createdAt: now,
        updatedAt: now,
        source: metadata?.source || 'upload',
        metadata: {
          ...metadata,
          originalImage: compressedImage,
          thumbnail: await compressImage(compressedImage, {
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.6
          }),
          confidence: ocrResult.confidence,
          processedAt: now
        }
      };
    } catch (error) {
      console.error('Image processing failed:', error);
      throw error;
    }
  }
}