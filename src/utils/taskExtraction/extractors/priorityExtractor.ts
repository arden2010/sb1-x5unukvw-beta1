import { Priority } from '../../../types';
import { PRIORITY_INDICATORS } from '../constants';

export class PriorityExtractor {
  static extract(text: string): Priority {
    const lowerText = text.toLowerCase();

    try {
      if (PRIORITY_INDICATORS.high.some(indicator => 
        lowerText.includes(indicator.toLowerCase())
      )) {
        return 'high';
      }

      if (PRIORITY_INDICATORS.low.some(indicator => 
        lowerText.includes(indicator.toLowerCase())
      )) {
        return 'low';
      }
    } catch (error) {
      console.warn('Priority extraction failed:', error);
    }

    return 'medium';
  }
}