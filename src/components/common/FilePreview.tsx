import React from 'react';
import { DocumentIcon, PhotoIcon } from '../icons';
import { FileService } from '../../services/files/fileService';

interface FilePreviewProps {
  fileName: string;
  fileType: string;
  fileSize?: number;
  thumbnail?: string;
  fileUrl?: string;
  onOpen?: () => void;
}

export default function FilePreview({
  fileName,
  fileType,
  fileSize,
  thumbnail,
  fileUrl,
  onOpen
}: FilePreviewProps) {
  const isImage = fileType.startsWith('image/');

  const handleClick = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
      onOpen?.();
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {isImage ? (
            <PhotoIcon className="h-8 w-8 text-blue-500" />
          ) : (
            <DocumentIcon className="h-8 w-8 text-gray-500" />
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {fileName}
            </h3>
            <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
              <span>{fileType}</span>
              {fileSize && (
                <>
                  <span>•</span>
                  <span>{FileService.formatFileSize(fileSize)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isImage && thumbnail && (
        <div 
          className="mt-4 cursor-zoom-in"
          onClick={handleClick}
        >
          <img
            src={thumbnail}
            alt={fileName}
            className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow"
          />
        </div>
      )}
    </div>
  );
}