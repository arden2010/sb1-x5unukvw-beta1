export interface DatePattern {
  pattern: RegExp;
  extract: (matches: RegExpMatchArray) => Date;
}

export interface TaskIndicator {
  pattern: RegExp;
  confidence: number;
}

export interface ExtractedTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  confidence: number;
}