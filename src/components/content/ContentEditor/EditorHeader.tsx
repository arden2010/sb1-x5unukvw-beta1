import { XMarkIcon } from '@heroicons/react/24/outline';

interface EditorHeaderProps {
  onClose: () => void;
}

export default function EditorHeader({ onClose }: EditorHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">编辑内容</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
          title="关闭 (Esc)"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}