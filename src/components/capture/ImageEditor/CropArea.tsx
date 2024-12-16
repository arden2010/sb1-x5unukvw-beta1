import React from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropAreaProps {
  imageData: string;
  crop: Crop;
  imgRef: React.RefObject<HTMLImageElement>;
  onCropChange: (crop: Crop) => void;
  onCropComplete: (crop: PixelCrop) => void;
}

export default function CropArea({
  imageData,
  crop,
  imgRef,
  onCropChange,
  onCropComplete
}: CropAreaProps) {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="max-h-[calc(90vh-200px)] overflow-auto">
        <ReactCrop
          crop={crop}
          onChange={onCropChange}
          onComplete={onCropComplete}
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
  );
}