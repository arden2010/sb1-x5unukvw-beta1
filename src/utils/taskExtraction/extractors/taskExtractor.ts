import { Content, Task } from '../../../types';
import { TextAnalyzer } from '../analyzers/textAnalyzer';
import { DateExtractor } from './dateExtractor';
import { PriorityExtractor } from './priorityExtractor';
import { TitleProcessor } from '../processors/titleProcessor';

export class TaskExtractor {
  static extract(content: Content): Partial<Task>[] {
    if (!content?.content) return [];

    try {
      const sentences = content.content
        .split(/[.。!！?？\n]+/)
        .map(s => s.trim())
        .filter(Boolean);

      return sentences
        .map(sentence => {
          const confidence = TextAnalyzer.calculateTaskConfidence(sentence);
          if (confidence < 0.6) return null;

          // Extract date first to include it in the title cleaning
          const dueDate = DateExtractor.extract(sentence);
          const title = TitleProcessor.clean(sentence, dueDate);

          // Skip if title is too short after cleaning
          if (title.length < 3) return null;

          return {
            title,
            description: `从内容"${content.title || '未命名内容'}"中提取的任务`,
            priority: PriorityExtractor.extract(sentence),
            dueDate,
            relatedContentIds: [content.id]
          };
        })
        .filter((task): task is Partial<Task> => 
          task !== null && 
          task.title !== undefined && 
          task.title.length > 0
        );
    } catch (error) {
      console.error('Task extraction failed:', error);
      return [];
    }
  }
}