import { Task } from '../../types';

export interface TaskSortOptions {
  prioritizeRecent?: boolean;
  prioritizeUndone?: boolean;
}

export class TaskSorter {
  static sort(tasks: Task[], options: TaskSortOptions = {}): Task[] {
    return [...tasks].sort((a, b) => {
      // 1. 首先按完成状态排序（未完成的在前）
      if (options.prioritizeUndone) {
        if (a.status === 'done' && b.status !== 'done') return 1;
        if (a.status !== 'done' && b.status === 'done') return -1;
      }

      // 2. 按创建时间排序（最新的在前）
      if (options.prioritizeRecent) {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        if (timeA !== timeB) return timeB - timeA;
      }

      // 3. 按优先级排序
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      // 4. 按截止日期排序（有截止日期的在前）
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      return 0;
    });
  }
}