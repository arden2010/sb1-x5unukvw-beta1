/**
 * Core file processing functionality
 */
import { ProcessedFile } from '../types';
import { ImageProcessor } from './ImageProcessor';
import { TextProcessor } from './TextProcessor';
import { FileValidator } from '../validators/FileValidator';
import { FileTypeDetector } from '../utils/FileTypeDetector';

export class FileProcessor {
  static async process(file: File): Promise<ProcessedFile> {
    try {
      // Validate file
      const validationError = FileValidator.validate(file);
      if (validationError) {
        throw new Error(validationError);
      }

      // Detect file type
      const fileType = FileTypeDetector.detect(file);
      if (!fileType) {
        throw new Error('Unsupported file type');
      }

      // Process based on type
      switch (fileType) {
        case 'image':
          return ImageProcessor.process(file);
        case 'text':
          return TextProcessor.process(file);
        default:
          throw new Error(`Unsupported file type: ${file.type}`);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Error(`File processing failed: ${message}`);
  }
}