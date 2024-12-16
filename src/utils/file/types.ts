/**
 * File processing types
 */
export interface ProcessedFile {
  type: 'image' | 'text';
  content: string;
  metadata: {
    originalName: string;
    size: number;
    type: string;
    lastModified: number;
    thumbnail?: string;
  };
}

export type FileType = 'image' | 'text';