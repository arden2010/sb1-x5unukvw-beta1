import { Content, ExtractedTask } from '../../../types';
import { calculateConfidence } from './confidenceCalculator';
import { extractDate } from './dateExtractor';
import { extractPriority } from './priorityExtractor';
import { cleanTaskTitle } from '../processors/titleProcessor';
import { generateDescription } from '../processors/descriptionProcessor';

export class EmailExtractor {
  static extract(content: Content): ExtractedTask[] {
    const lines = content.content.split('\n');
    const tasks: ExtractedTask[] = [];

    let currentText = '';
    for (const line of lines) {
      if (this.isTaskLine(line)) {
        if (currentText) {
          const confidence = calculateConfidence(currentText);
          if (confidence >= 0.6) {
            tasks.push({
              title: cleanTaskTitle(currentText),
              description: generateDescription(currentText, content),
              priority: extractPriority(currentText),
              dueDate: extractDate(currentText)?.toISOString(),
              confidence
            });
          }
        }
        currentText = line;
      } else if (currentText && line.trim()) {
        currentText += ' ' + line;
      }
    }

    return tasks;
  }

  private static isTaskLine(line: string): boolean {
    const taskIndicators = [
      /^[-*•]/,
      /^\d+[.、)]/,
      /^[(（]\d+[)）]/,
      /^(todo|task|action|note):/i,
      /^(待办|任务|行动|注意)[:：]/
    ];

    return taskIndicators.some(pattern => pattern.test(line.trim()));
  }
}