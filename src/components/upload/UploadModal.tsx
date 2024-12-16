import { XMarkIcon } from '@heroicons/react/24/outline';
import FileUpload from './FileUpload';

interface UploadModalProps {
  onClose: () => void;
}

export default function UploadModal({ onClose }: UploadModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">上传文件</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
              title="关闭 (Esc)"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <FileUpload onComplete={onClose} />
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            上传的文件将被自动处理并保存为内容
          </p>
        </div>
      </div>
    </div>
  );
}