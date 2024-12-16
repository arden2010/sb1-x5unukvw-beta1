/**
 * File type detection utilities
 */
import { SUPPORTED_FILE_TYPES } from '../constants';

export class FileTypeDetector {
  static detect(file: File): 'image' | 'text' | null {
    if (SUPPORTED_FILE_TYPES.images.includes(file.type)) {
      return 'image';
    }
    
    if (SUPPORTED_FILE_TYPES.documents.includes(file.type)) {
      return 'text';
    }

    return null;
  }
}