import { DateExtractor } from '../extractors/dateExtractor';

export class TitleProcessor {
  static clean(text: string, dueDate?: string): string {
    let title = text.trim();

    // Remove common prefixes
    const prefixes = [
      '需要', '必须', '应该', '要', '得', '请', '建议',
      'need to', 'must', 'should', 'have to', 'please'
    ];

    for (const prefix of prefixes) {
      if (title.toLowerCase().startsWith(prefix.toLowerCase())) {
        title = title.slice(prefix.length).trim();
      }
    }

    // Remove date information if it's already captured in dueDate
    if (dueDate) {
      const dateInfo = DateExtractor.getDateText(text);
      if (dateInfo) {
        title = title.replace(dateInfo, '').trim();
      }
    }

    // Ensure reasonable length
    if (title.length > 100) {
      // Try to find a natural break point
      const breakPoint = title.slice(0, 100).lastIndexOf('，') ||
                        title.slice(0, 100).lastIndexOf('。') ||
                        title.slice(0, 100).lastIndexOf('；') ||
                        97;
      
      title = title.slice(0, breakPoint) + '...';
    }

    // Clean up any remaining artifacts
    title = title
      .replace(/^[,;，；\s]+/, '') // Remove leading punctuation
      .replace(/[,;，；\s]+$/, '') // Remove trailing punctuation
      .trim();

    return title;
  }
}