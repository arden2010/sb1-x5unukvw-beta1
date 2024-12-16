import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { Content, Task } from '../types';
import { TaskExtractor } from '../utils/taskExtraction/taskExtractor';
import { toast } from 'react-hot-toast';

export function useTaskExtraction() {
  const { addTask } = useStore();
  const [isExtracting, setIsExtracting] = useState(false);

  const extractTasksFromContent = useCallback(async (content: Content): Promise<Task[]> => {
    if (!content?.content) {
      return [];
    }

    setIsExtracting(true);
    try {
      // Extract tasks immediately
      const extractedTasks = TaskExtractor.extract(content);
      
      // Convert extracted tasks to actual tasks
      const tasks: Task[] = extractedTasks.map(extracted => ({
        id: crypto.randomUUID(),
        title: extracted.title,
        description: extracted.description,
        status: 'todo',
        priority: extracted.priority,
        dueDate: extracted.dueDate,
        relatedContentIds: [content.id],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      // Add tasks to store
      for (const task of tasks) {
        await addTask(task);
      }

      if (tasks.length > 0) {
        toast.success(`已提取 ${tasks.length} 个任务`);
      }

      return tasks;
    } catch (error) {
      console.error('Task extraction failed:', error);
      return [];
    } finally {
      setIsExtracting(false);
    }
  }, [addTask]);

  return {
    extractTasksFromContent,
    isExtracting
  };
}