import { Content, ExtractedTask } from '../../../types';
import { calculateConfidence } from './confidenceCalculator';
import { extractDate } from './dateExtractor';
import { extractPriority } from './priorityExtractor';
import { cleanTaskTitle } from '../processors/titleProcessor';
import { generateDescription } from '../processors/descriptionProcessor';

export class GeneralExtractor {
  static extract(content: Content): ExtractedTask[] {
    const segments = content.content
      .split(/[.。!！?？\n]+/)
      .map(s => s.trim())
      .filter(Boolean);

    return segments
      .map(segment => {
        const confidence = calculateConfidence(segment);
        if (confidence < 0.6) return null;

        return {
          title: cleanTaskTitle(segment),
          description: generateDescription(segment, content),
          priority: extractPriority(segment),
          dueDate: extractDate(segment)?.toISOString(),
          confidence
        };
      })
      .filter((task): task is ExtractedTask => 
        task !== null && 
        task.confidence >= 0.6 &&
        task.title.length > 0
      );
  }
}