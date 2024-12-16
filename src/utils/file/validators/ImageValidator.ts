/**
 * Image-specific validation
 */
import { SUPPORTED_FILE_TYPES } from '../constants';

export class ImageValidator {
  static validate(file: File): void {
    if (!SUPPORTED_FILE_TYPES.images.includes(file.type)) {
      throw new Error('Unsupported image format');
    }

    if (!file.size || file.size <= 0) {
      throw new Error('Invalid image file size');
    }
  }
}