import React from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface EditorFormProps {
  imageData: string;
  imgRef: React.RefObject<HTMLImageElement>;
  crop: Crop;
  onCropChange: (crop: Crop) => void;
  onCropComplete: (crop: any) => void;
}

export default function EditorForm({
  imageData,
  imgRef,
  crop,
  onCropChange,
  onCropComplete
}: EditorFormProps) {
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
      <p className="mt-4 text-sm text-gray-500 text-center">
        可以拖动选择区域进行裁剪，或直接点击确认识别整张图片
      </p>
    </div>
  );
}