import { Content } from '../../types';

// File type definitions
export const SUPPORTED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export class FileService {
  static validateFile(file: File): string | null {
    if (file.size > MAX_FILE_SIZE) {
      return `文件大小超过限制 (最大 ${this.formatFileSize(MAX_FILE_SIZE)})`;
    }

    const isSupported = [...SUPPORTED_FILE_TYPES.images, ...SUPPORTED_FILE_TYPES.documents]
      .includes(file.type);
    
    if (!isSupported) {
      return '不支持的文件类型';
    }

    return null;
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  static async createThumbnail(file: File): Promise<string | null> {
    if (!file.type.startsWith('image/')) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    return new Promise((resolve) => {
      img.onload = () => {
        URL.revokeObjectURL(imageUrl);
        const MAX_SIZE = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = height * (MAX_SIZE / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = width * (MAX_SIZE / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = imageUrl;
    });
  }
}