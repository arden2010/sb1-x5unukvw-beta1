interface HeaderProps {
  onClose: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">编辑截图</h2>
        <button 
          onClick={onClose}
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
  );
}