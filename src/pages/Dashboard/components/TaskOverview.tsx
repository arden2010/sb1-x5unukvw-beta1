import { Task } from '../../../types';
import { Link } from 'react-router-dom';

interface TaskOverviewProps {
  tasks: Task[];
}

export default function TaskOverview({ tasks }: TaskOverviewProps) {
  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    done: tasks.filter(t => t.status === 'done')
  };

  const tasksByPriority = {
    high: tasks.filter(t => t.priority === 'high' && t.status !== 'done'),
    medium: tasks.filter(t => t.priority === 'medium' && t.status !== 'done'),
    low: tasks.filter(t => t.priority === 'low' && t.status !== 'done')
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">任务概览</h2>
          <Link 
            to="/tasks"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            查看全部
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {tasksByStatus.todo.length}
            </div>
            <div className="text-sm text-gray-500">待办</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {tasksByStatus['in-progress'].length}
            </div>
            <div className="text-sm text-gray-500">进行中</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {tasksByStatus.done.length}
            </div>
            <div className="text-sm text-gray-500">已完成</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">优先级分布</h3>
          <div className="space-y-2">
            {Object.entries(tasksByPriority).map(([priority, tasks]) => (
              <div key={priority} className="flex items-center">
                <span className="text-sm text-gray-500 w-12">
                  {{
                    high: '高',
                    medium: '中',
                    low: '低'
                  }[priority]}
                </span>
                <div className="flex-1 ml-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`rounded-full h-2 ${
                        priority === 'high'
                          ? 'bg-red-500'
                          : priority === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${(tasks.length / (tasksByStatus.todo.length + tasksByStatus['in-progress'].length)) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {tasks.length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}