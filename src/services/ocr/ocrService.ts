import Tesseract from 'tesseract.js';
import { toast } from 'react-hot-toast';

export class OCRService {
  static async recognize(imageData: string): Promise<{ text: string; confidence: number }> {
    try {
      const worker = await Tesseract.createWorker();
      
      // Always use both English and Simplified Chinese
      await worker.loadLanguage('eng+chi_sim');
      await worker.initialize('eng+chi_sim');
      
      const result = await worker.recognize(imageData);
      await worker.terminate();

      if (!result.data.text.trim()) {
        throw new Error('No text detected in image');
      }

      return {
        text: result.data.text,
        confidence: result.data.confidence
      };
    } catch (error) {
      console.error('OCR processing failed:', error);
      toast.error('文字识别失败，请重试');
      throw error;
    }
  }
}