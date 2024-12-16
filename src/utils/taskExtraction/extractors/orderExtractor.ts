import { Content, ExtractedTask } from '../../../types';
import { extractDate } from './dateExtractor';
import { generateDescription } from '../processors/descriptionProcessor';

export class OrderExtractor {
  static extract(content: Content): ExtractedTask[] {
    const tasks: ExtractedTask[] = [];
    const text = content.content;

    // Extract order numbers
    const orderNumbers = text.match(/[A-Z0-9]{3,}[-_]?[0-9]+/g) || [];
    
    if (orderNumbers.length > 0) {
      tasks.push({
        title: `检查订单 ${orderNumbers.join(', ')} 的发票`,
        description: generateDescription(text, content),
        priority: 'medium',
        dueDate: extractDate(text)?.toISOString(),
        confidence: 0.9
      });
    }

    return tasks;
  }
}