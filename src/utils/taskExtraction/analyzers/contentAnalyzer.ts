import { Content } from '../../../types';

export type ContentType = 'email' | 'order' | 'general' | 'non-task';

export class ContentAnalyzer {
  static analyze(content: Content): ContentType {
    const text = content.content.toLowerCase();
    
    // Check if it's a greeting or non-task content
    if (this.isGreetingOrNonTask(text)) {
      return 'non-task';
    }

    // Check if it's order-related
    if (text.includes('po') || text.includes('订单') || text.includes('发票')) {
      return 'order';
    }

    // Check if it's an email
    if (text.includes('subject:') || text.includes('发件人:') || text.includes('收件人:')) {
      return 'email';
    }

    return 'general';
  }

  private static isGreetingOrNonTask(text: string): boolean {
    const nonTaskPatterns = [
      /^(hello|hi|hey|dear)/i,
      /^(你好|早上好|下午好|晚上好)/,
      /best regards|sincerely|yours/i,
      /此致|敬礼|祝好/,
      /hope you are|how are you/i,
      /^fyi|for your information/i
    ];

    return nonTaskPatterns.some(pattern => pattern.test(text));
  }
}