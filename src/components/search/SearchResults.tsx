import { Content, Task } from '../../types';
import SearchResultsList from './SearchResultsList';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SearchResultsProps {
  contents: Content[];
  tasks: Task[];
  onClose: () => void;
}

export default function SearchResults({ contents, tasks, onClose }: SearchResultsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute inset-x-0 top-0 bg-white shadow-lg max-h-screen overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">搜索结果</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
              title="关闭 (Esc)"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {(contents.length > 0 || tasks.length > 0) ? (
            <SearchResultsList
              contents={contents}
              tasks={tasks}
              onClose={onClose}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">未找到相关内容</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}