import { compressImage } from './imageProcessing';

interface ProcessedFile {
  type: 'image' | 'text';
  content: string;
  metadata?: {
    originalName: string;
    size: number;
    type: string;
    lastModified: number;
  };
}

export async function processFile(file: File): Promise<ProcessedFile> {
  const metadata = {
    originalName: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  };

  // Handle different file types
  if (file.type.startsWith('image/')) {
    return processImage(file, metadata);
  } else if (file.type === 'application/pdf') {
    return processText(file, metadata);
  } else if (
    file.type === 'text/plain' ||
    file.type === 'application/msword' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return processText(file, metadata);
  } else {
    throw new Error('Unsupported file type');
  }
}

async function processImage(file: File, metadata: any): Promise<ProcessedFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;
        if (!imageData) {
          throw new Error('Failed to read image data');
        }

        const compressedImage = await compressImage(imageData, {
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.8
        });

        resolve({
          type: 'image',
          content: compressedImage,
          metadata
        });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

async function processText(file: File, metadata: any): Promise<ProcessedFile> {
  const text = await file.text();
  return {
    type: 'text',
    content: text,
    metadata
  };
}