import React, { useState, useEffect, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '../common/Button';

interface ImageEditorProps {
  imageData: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
}

export default function ImageEditor({ imageData, onSave, onCancel }: ImageEditorProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const croppedImageData = canvas.toDataURL('image/png');
    onSave(croppedImageData);
  }, [completedCrop, onSave]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      getCroppedImg();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }, [getCroppedImg, onCancel]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">编辑截图</h2>
            <button 
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500"
              aria-label="关闭"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            拖动或调整选框来裁剪图片，按Enter确认，Esc取消
          </p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="max-h-[calc(90vh-200px)] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={undefined}
            >
              <img
                ref={imgRef}
                src={imageData}
                alt="Screenshot to crop"
                className="max-w-full"
              />
            </ReactCrop>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3 bg-white">
          <Button variant="secondary" onClick={onCancel}>
            取消
          </Button>
          <Button onClick={getCroppedImg}>
            确认并识别
          </Button>
        </div>
      </div>
    </div>
  );
}