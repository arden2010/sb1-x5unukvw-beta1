import { CameraIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useScreenshotCapture } from '../../hooks/useScreenshotCapture';
import { useClipboardMonitor } from '../../hooks/useClipboardMonitor';
import ImageEditor from './ImageEditor';
import LoadingOverlay from '../common/LoadingOverlay';

export default function CaptureButton() {
  const {
    isCapturing,
    isProcessing,
    isEditing,
    currentImage,
    progress,
    captureScreen,
    handleSaveImage,
    handleCancel
  } = useScreenshotCapture();

  const { handleClipboardCapture, isCapturing: isClipboardCapturing } = useClipboardMonitor();

  const isDisabled = isCapturing || isEditing || isProcessing || isClipboardCapturing;

  return (
    <>
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 screenshot-exclude">
        <button
          onClick={captureScreen}
          disabled={isDisabled}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title="截图"
        >
          <CameraIcon className="h-6 w-6" />
        </button>

        <button
          onClick={handleClipboardCapture}
          disabled={isDisabled}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title="从剪贴板获取"
        >
          <ClipboardIcon className="h-6 w-6" />
        </button>
      </div>

      {isEditing && currentImage && (
        <ImageEditor
          imageData={currentImage}
          onSave={handleSaveImage}
          onCancel={handleCancel}
          isProcessing={isProcessing}
        />
      )}

      {(isCapturing || isProcessing || isClipboardCapturing) && progress > 0 && (
        <LoadingOverlay 
          message={
            isCapturing ? "正在截图..." : 
            isProcessing ? "正在处理图片..." : 
            "正在获取剪贴板内容..."
          }
          progress={progress}
          className="screenshot-exclude"
        />
      )}
    </>
  );
}