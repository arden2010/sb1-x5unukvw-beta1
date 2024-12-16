import React, { useState, useEffect, useCallback } from 'react';
import ReactCrop, { Crop } from 'react-crop';
import 'react-crop/dist/ReactCrop.css';
import EditorHeader from './EditorHeader';
import EditorForm from './EditorForm';
import EditorFooter from './EditorFooter';
import LoadingOverlay from '../../common/LoadingOverlay';

interface ImageEditorProps {
  imageData: string;
  onSave: (imageData: string) => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export default function ImageEditor({
  imageData,
  onSave,
  onCancel,
  isProcessing = false
}: ImageEditorProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleSave = useCallback(() => {
    if (!imgRef.current) return;

    // If no crop is selected or it's the full image, use the original image
    if (!completedCrop || (completedCrop.width === 100 && completedCrop.height === 100)) {
      onSave(imageData);
      return;
    }

    // Get cropped image
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
  }, [completedCrop, imageData, onSave]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave();
      } else if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, onCancel]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative">
        <EditorHeader onClose={onCancel} />
        
        <EditorForm 
          imageData={imageData}
          imgRef={imgRef}
          crop={crop}
          onCropChange={setCrop}
          onCropComplete={setCompletedCrop}
        />
        
        <EditorFooter 
          onSave={handleSave}
          onCancel={onCancel}
          isProcessing={isProcessing}
          showProcessingText={!completedCrop || (completedCrop.width === 100 && completedCrop.height === 100)}
        />

        {isProcessing && (
          <LoadingOverlay message="正在处理图片..." />
        )}
      </div>
    </div>
  );
}