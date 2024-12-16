import { Content, Task } from '../../types';
import { extractKeywords } from '../../utils/ai/keywordExtractor';
import { PRIORITY_INDICATORS } from '../../utils/constants/taskConstants';

export class TaskExtractor {
  static extract(content: Content): Partial<Task>[] {
    const tasks: Partial<Task>[] = [];
    const sentences = content.content.split(/[.。!！?？\n]+/).filter(Boolean);

    sentences.forEach(sentence => {
      const confidence = this.calculateTaskConfidence(sentence);
      if (confidence >= 0.6) {
        tasks.push({
          title: this.cleanTaskTitle(sentence),
          description: `从内容"${content.title}"中提取的任务`,
          priority: this.determinePriority(sentence),
          status: 'todo',
          dueDate: this.extractDueDate(sentence),
          relatedContentIds: [content.id]
        });
      }
    });

    return tasks;
  }

  private static calculateTaskConfidence(text: string): number {
    let confidence = 0;

    // Check for task indicators
    if (text.match(/需要|必须|应该|要|得|完成|实现|开发|设计|创建|更新|修改/)) {
      confidence += 0.4;
    }

    // Check for time indicators
    if (text.match(/今天|明天|后天|下周|下个月|(\d+)天后/)) {
      confidence += 0.3;
    }

    // Check for priority indicators
    if (text.match(/紧急|重要|优先|立即|马上/)) {
      confidence += 0.2;
    }

    // Penalize questions
    if (text.match(/[?？]$/)) {
      confidence -= 0.3;
    }

    return Math.min(1, Math.max(0, confidence));
  }

  private static determinePriority(text: string): Task['priority'] {
    const lowerText = text.toLowerCase();
    
    if (PRIORITY_INDICATORS.high.some(indicator => lowerText.includes(indicator))) {
      return 'high';
    }
    if (PRIORITY_INDICATORS.low.some(indicator => lowerText.includes(indicator))) {
      return 'low';
    }
    return 'medium';
  }

  private static extractDueDate(text: string): string | undefined {
    const now = new Date();
    const matches = {
      today: text.match(/今天/),
      tomorrow: text.match(/明天/),
      dayAfterTomorrow: text.match(/后天/),
      nextWeek: text.match(/下周/),
      nextMonth: text.match(/下个月/),
      daysLater: text.match(/(\d+)天后/)
    };

    if (matches.today) return now.toISOString();
    if (matches.tomorrow) return new Date(now.setDate(now.getDate() + 1)).toISOString();
    if (matches.dayAfterTomorrow) return new Date(now.setDate(now.getDate() + 2)).toISOString();
    if (matches.nextWeek) return new Date(now.setDate(now.getDate() + 7)).toISOString();
    if (matches.nextMonth) return new Date(now.setMonth(now.getMonth() + 1)).toISOString();
    if (matches.daysLater) {
      const days = parseInt(matches.daysLater[1]);
      return new Date(now.setDate(now.getDate() + days)).toISOString();
    }

    return undefined;
  }

  private static cleanTaskTitle(text: string): string {
    return text.trim()
      .replace(/^(需要|必须|应该|要|得|请|建议)/, '')
      .trim();
  }
}