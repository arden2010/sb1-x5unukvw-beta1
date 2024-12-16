import { Content } from '../types';
import { ContentStorageService } from './storage/contentStorage';
import { OCRService } from './ocr/ocrService';
import { processContent } from '../utils/contentProcessing';
import { ImageProcessor } from './imageProcessing/processors/ImageProcessor';

export class ContentCaptureService {
  static async captureImage(imageData: string, metadata = {}): Promise<Content> {
    if (!imageData) {
      throw new Error('Image data cannot be empty');
    }

    try {
      // 1. Process and compress image
      const processedImage = await ImageProcessor.process(imageData, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8
      });

      // 2. Create thumbnail
      const thumbnail = await ImageProcessor.process(processedImage, {
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.6
      });

      // 3. Perform OCR
      const { text, confidence } = await OCRService.recognize(processedImage);

      if (!text.trim()) {
        throw new Error('No text detected in image');
      }

      // 4. Create content object
      const now = new Date().toISOString();
      const content: Content = {
        id: crypto.randomUUID(),
        type: 'image',
        title: text.slice(0, 50) + (text.length > 50 ? '...' : ''),
        content: text,
        tags: [],
        createdAt: now,
        updatedAt: now,
        source: 'screenshot',
        metadata: {
          ...metadata,
          originalImage: processedImage,
          thumbnail,
          confidence,
          processedAt: now,
          wordCount: text.split(/\s+/).length
        }
      };

      // 5. Process and store content
      const processedContent = await processContent(content);
      return await ContentStorageService.store(processedContent);
    } catch (error) {
      console.error('Image capture failed:', error);
      throw new Error('Failed to capture image content');
    }
  }

  static async captureText(text: string): Promise<Content> {
    if (!text?.trim()) {
      throw new Error('Content cannot be empty');
    }

    try {
      const now = new Date().toISOString();
      const content: Content = {
        id: crypto.randomUUID(),
        type: 'text',
        title: text.slice(0, 50) + (text.length > 50 ? '...' : ''),
        content: text,
        tags: [],
        createdAt: now,
        updatedAt: now,
        source: 'clipboard',
        metadata: {
          wordCount: text.split(/\s+/).length,
          processedAt: now
        }
      };

      const processedContent = await processContent(content);
      return await ContentStorageService.store(processedContent);
    } catch (error) {
      console.error('Text capture failed:', error);
      throw new Error('Failed to capture text content');
    }
  }
}