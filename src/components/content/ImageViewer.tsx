import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImageViewerProps {
  src: string;
  alt?: string;
  onClose?: () => void;
}

export default function ImageViewer({ src, alt, onClose }: ImageViewerProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt || '图片预览'}
        className="max-w-full max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}