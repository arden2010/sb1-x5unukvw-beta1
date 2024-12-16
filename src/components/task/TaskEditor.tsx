import { useState, useCallback } from 'react';
import { Task } from '../../types';
import Button from '../common/Button';

interface TaskEditorProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TaskEditor({
  task: initialTask,
  onSave,
  onCancel,
  isLoading
}: TaskEditorProps) {
  const [task, setTask] = useState(initialTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...task,
      updatedAt: new Date().toISOString()
    });
  };

  const handleTitleBarDoubleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.task-title-bar')) {
      onCancel();
    }
  }, [onCancel]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden">
        <div 
          className="px-6 py-4 border-b border-gray-200 task-title-bar cursor-pointer"
          onDoubleClick={handleTitleBarDoubleClick}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">编辑任务</h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">关闭</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">双击标题栏可关闭</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  标题
                </label>
                <input
                  type="text"
                  id="title"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  描述
                </label>
                <textarea
                  id="description"
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  rows={8}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
                    负责人
                  </label>
                  <input
                    type="text"
                    id="assignee"
                    value={task.assignee || ''}
                    onChange={(e) => setTask({ ...task, assignee: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="输入负责人姓名"
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    优先级
                  </label>
                  <select
                    id="priority"
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value as Task['priority'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                    截止日期
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={task.dueDate ? task.dueDate.split('T')[0] : ''}
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fixed footer with buttons */}
          <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              取消
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}