export interface CompressOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ProcessingProgress {
  stage: 'loading' | 'processing' | 'compressing' | 'converting';
  progress: number;
}