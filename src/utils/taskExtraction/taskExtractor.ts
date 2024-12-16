import { Content, ExtractedTask } from '../../types';
import { ContentAnalyzer, ContentType } from './analyzers/contentAnalyzer';
import { OrderExtractor } from './extractors/orderExtractor';
import { EmailExtractor } from './extractors/emailExtractor';
import { GeneralExtractor } from './extractors/generalExtractor';

export class TaskExtractor {
  static extract(content: Content): ExtractedTask[] {
    if (!content?.content) {
      console.warn('Empty content provided for task extraction');
      return [];
    }

    try {
      // 1. Analyze content type
      const contentType = ContentAnalyzer.analyze(content);
      if (contentType === 'non-task') {
        return [];
      }

      // 2. Extract tasks based on content type
      return this.extractByType(content, contentType);
    } catch (error) {
      console.error('Task extraction failed:', error);
      return [];
    }
  }

  private static extractByType(content: Content, type: ContentType): ExtractedTask[] {
    switch (type) {
      case 'order':
        return OrderExtractor.extract(content);
      case 'email':
        return EmailExtractor.extract(content);
      default:
        return GeneralExtractor.extract(content);
    }
  }
}