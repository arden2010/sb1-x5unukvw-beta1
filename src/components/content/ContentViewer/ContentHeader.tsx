import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ContentHeaderProps {
  onClose: () => void;
  aiEnabled?: boolean;
}

export default function ContentHeader({ onClose, aiEnabled }: ContentHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-900">查看内容</h3>
          {aiEnabled && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              <SparklesIcon className="h-3.5 w-3.5" />
              <span>AI 增强</span>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
          title="关闭 (Esc)"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <p className="mt-1 text-sm text-gray-500">双击内容区域或按 Esc 键关闭</p>
    </div>
  );
}