interface LoadingOverlayProps {
  message?: string;
  progress?: number;
  className?: string;
}

export default function LoadingOverlay({ 
  message = '加载中...', 
  progress,
  className = ''
}: LoadingOverlayProps) {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 screenshot-exclude ${className}`}>
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {typeof progress === 'number' && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}