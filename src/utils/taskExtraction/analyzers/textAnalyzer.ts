import { TaskIndicator } from '../types';
import { ALL_ACTION_VERBS } from '../../constants/taskConstants';

export class TextAnalyzer {
  static calculateTaskConfidence(text: string): number {
    let confidence = 0;
    const lowerText = text.toLowerCase();

    // 1. Check for action verbs
    const hasActionVerb = ALL_ACTION_VERBS.some(verb => {
      // Match both exact words and word stems
      const pattern = new RegExp(`\\b${verb}(s|es|ed|ing)?\\b`, 'i');
      return pattern.test(lowerText);
    });
    if (hasActionVerb) confidence += 0.4;

    // 2. Check for time indicators
    const hasTimeIndicator = /(今天|明天|后天|下周|下个月|today|tomorrow|next|in \d+|by|until|deadline)/i.test(text);
    if (hasTimeIndicator) confidence += 0.3;

    // 3. Check for task-like sentence structure
    if (this.hasTaskStructure(text)) confidence += 0.2;

    // 4. Apply penalties for non-task content
    confidence += this.calculatePenalties(text);

    // 5. Boost confidence for strong indicators
    confidence += this.calculateBoosts(text);

    return Math.min(1, Math.max(0, confidence));
  }

  private static hasTaskStructure(text: string): boolean {
    // Check for imperative mood or task-like structure
    return /^[A-Z]|^[一-龥]|^(to|need to|should|must|will|please)/i.test(text) &&
           text.length >= 5 && text.length <= 200;
  }

  private static calculatePenalties(text: string): number {
    let penalty = 0;
    
    // Questions
    if (/[?？]$/.test(text)) penalty -= 0.4;
    if (/^(what|when|where|why|who|how|which|是否|为何|为什么|怎么|如何)/i.test(text)) penalty -= 0.3;
    
    // Statements/observations
    if (/^(it is|this is|that is|these are|those are|这是|那是|这些|那些)/i.test(text)) penalty -= 0.2;
    
    // Greetings/closings
    if (/^(hi|hello|hey|dear|sincerely|regards|你好|您好|致敬|此致)/i.test(text)) penalty -= 0.5;

    return penalty;
  }

  private static calculateBoosts(text: string): number {
    let boost = 0;

    // Strong task indicators
    if (/task|todo|action item|待办|任务|工作项/i.test(text)) boost += 0.2;
    
    // Numbered/bulleted items
    if (/^(\d+[\.\)、]|\-|\*|\•)/.test(text)) boost += 0.1;
    
    // Assignment indicators
    if (/assign|responsible|owner|负责|承担|负责人/i.test(text)) boost += 0.1;
    
    // Status indicators
    if (/pending|in progress|not started|待处理|进行中|未开始/i.test(text)) boost += 0.1;

    return boost;
  }
}