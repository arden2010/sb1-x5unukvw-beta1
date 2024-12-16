import { useCallback } from 'react';
import { useStore } from '../store';
import { Content, Task } from '../types';
import { TaskExtractor } from '../utils/taskExtraction/extractors/taskExtractor';
import { toast } from 'react-hot-toast';

export function useAutoTaskExtraction() {
  const { addTask } = useStore();

  const extractAndCreateTasks = useCallback(async (content: Content) => {
    try {
      // Extract tasks from content
      const extractedTasks = TaskExtractor.extract(content);
      
      if (extractedTasks.length === 0) {
        return [];
      }

      // Create tasks with proper linking
      const createdTasks: Task[] = [];
      for (const taskData of extractedTasks) {
        if (!taskData.title) continue;

        const task: Task = {
          id: crypto.randomUUID(),
          title: taskData.title,
          description: `从内容"${content.title || content.content.slice(0, 50)}..."中提取的任务\n\n原文：${content.content}`,
          status: 'todo',
          priority: taskData.priority || 'medium',
          dueDate: taskData.dueDate,
          relatedContentIds: [content.id],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await addTask(task);
        createdTasks.push(task);
      }

      if (createdTasks.length > 0) {
        toast.success(
          `已从内容中提取 ${createdTasks.length} 个任务`,
          { duration: 3000 }
        );
      }

      return createdTasks;
    } catch (error) {
      console.error('Failed to extract tasks:', error);
      toast.error('提取任务失败');
      return [];
    }
  }, [addTask]);

  return { extractAndCreateTasks };
}