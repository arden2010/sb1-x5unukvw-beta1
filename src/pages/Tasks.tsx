import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTaskManagement } from '../hooks/useTaskManagement';
import TaskList from '../components/task/TaskList';
import TaskForm from '../components/task/TaskForm';
import TaskEditor from '../components/task/TaskEditor';
import Button from '../components/common/Button';
import { Task } from '../types';

export default function Tasks() {
  const location = useLocation();
  const { 
    tasks, 
    createTask, 
    updateTask, 
    updateTaskStatus,
    deleteTask,
    isProcessing 
  } = useTaskManagement();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Handle navigation from search results
  useEffect(() => {
    const state = location.state as { selectedTask?: Task };
    if (state?.selectedTask) {
      setEditingTask(state.selectedTask);
      // Clear the location state to avoid reopening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleSave = async (updatedTask: Task) => {
    await updateTask(updatedTask);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">任务</h1>
          <p className="mt-1 text-sm text-gray-500">
            点击任务前的圆圈可以标记完成或取消完成
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? '取消' : '新建任务'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow">
          <TaskForm 
            onSubmit={async (task) => {
              await createTask(task);
              setShowForm(false);
            }}
            isLoading={isProcessing}
          />
        </div>
      )}

      <TaskList
        tasks={tasks}
        onStatusChange={updateTaskStatus}
        onEdit={handleEdit}
        onDelete={deleteTask}
      />

      {editingTask && (
        <TaskEditor
          task={editingTask}
          onSave={handleSave}
          onCancel={() => setEditingTask(null)}
          isLoading={isProcessing}
        />
      )}
    </div>
  );
}