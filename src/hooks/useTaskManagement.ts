import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { Task } from '../types';
import { toast } from 'react-hot-toast';

export function useTaskManagement() {
  const { tasks: storeTasks, addTask, updateTask: storeUpdateTask, removeTask } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deletedTasks, setDeletedTasks] = useState<Record<string, Task>>({});
  const [completedTasks, setCompletedTasks] = useState<Record<string, Task>>({});

  // Animation delay of 2 seconds
  const ANIMATION_DELAY = 2000;

  const tasks = storeTasks.map(task => ({
    ...task,
    isDeleted: !!deletedTasks[task.id],
    isCompleted: !!completedTasks[task.id]
  }));

  const createTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsProcessing(true);
    try {
      const task: Task = {
        id: crypto.randomUUID(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await addTask(task);
      toast.success('任务已创建');
      return task;
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('创建任务失败');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [addTask]);

  const updateTask = useCallback(async (task: Task) => {
    setIsProcessing(true);
    try {
      await storeUpdateTask(task.id, {
        ...task,
        updatedAt: new Date().toISOString()
      });
      toast.success('任务已更新');
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('更新任务失败');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [storeUpdateTask]);

  const updateTaskStatus = useCallback(async (id: string, status: Task['status']) => {
    setIsProcessing(true);
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      // Mark task as completed and keep it visible
      if (status === 'done') {
        setCompletedTasks(prev => ({ ...prev, [id]: task }));
        
        // Remove from completed tasks after delay
        setTimeout(() => {
          setCompletedTasks(prev => {
            const { [id]: _, ...rest } = prev;
            return rest;
          });
        }, ANIMATION_DELAY);
      }

      await storeUpdateTask(id, { 
        status, 
        updatedAt: new Date().toISOString() 
      });

      toast.success(status === 'done' ? '任务已完成' : '任务已重新打开', {
        duration: ANIMATION_DELAY
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
      toast.error('更新任务状态失败');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [storeUpdateTask, tasks]);

  const deleteTask = useCallback(async (id: string) => {
    setIsProcessing(true);
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      // Mark task as deleted and keep it visible
      setDeletedTasks(prev => ({ ...prev, [id]: task }));

      // Remove task after delay
      setTimeout(async () => {
        await removeTask(id);
        setDeletedTasks(prev => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }, ANIMATION_DELAY);

      toast.success('任务已删除', {
        duration: ANIMATION_DELAY
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('删除任务失败');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [removeTask, tasks]);

  return {
    tasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isProcessing
  };
}