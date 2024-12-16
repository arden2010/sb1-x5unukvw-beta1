/**
 * Text file processing
 */
import { ProcessedFile } from '../types';
import { TextValidator } from '../validators/TextValidator';

export class TextProcessor {
  static async process(file: File): Promise<ProcessedFile> {
    try {
      // Validate text file
      TextValidator.validate(file);

      // Read file content
      const content = await file.text();

      return {
        type: 'text',
        content,
        metadata: {
          originalName: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Error(`Text processing failed: ${message}`);
  }
}