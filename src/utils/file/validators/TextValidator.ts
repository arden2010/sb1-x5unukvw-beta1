/**
 * Text-specific validation
 */
import { SUPPORTED_FILE_TYPES } from '../constants';

export class TextValidator {
  static validate(file: File): void {
    if (!SUPPORTED_FILE_TYPES.documents.includes(file.type)) {
      throw new Error('Unsupported text format');
    }

    if (!file.size || file.size <= 0) {
      throw new Error('Invalid text file size');
    }
  }
}