import { Content, Task } from '../../types';
import SearchResultItem from './SearchResultItem';

interface SearchResultsListProps {
  contents: Content[];
  tasks: Task[];
  onClose: () => void;
}

export default function SearchResultsList({ contents, tasks, onClose }: SearchResultsListProps) {
  return (
    <div className="space-y-8">
      {contents.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            内容 ({contents.length})
          </h3>
          <div className="space-y-2">
            {contents.map(content => (
              <SearchResultItem
                key={content.id}
                item={content}
                type="content"
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      )}

      {tasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            任务 ({tasks.length})
          </h3>
          <div className="space-y-2">
            {tasks.map(task => (
              <SearchResultItem
                key={task.id}
                item={task}
                type="task"
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}