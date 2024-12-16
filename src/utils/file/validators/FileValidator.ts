/**
 * File validation utilities
 */
import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from '../constants';
import { formatFileSize } from '../utils/fileSize';

export class FileValidator {
  static validate(file: File): string | null {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `文件大小超过限制 (最大 ${formatFileSize(MAX_FILE_SIZE)})`;
    }

    // Check file type
    const isSupported = [...SUPPORTED_FILE_TYPES.images, ...SUPPORTED_FILE_TYPES.documents]
      .includes(file.type);
    
    if (!isSupported) {
      return '不支持的文件类型';
    }

    return null;
  }
}