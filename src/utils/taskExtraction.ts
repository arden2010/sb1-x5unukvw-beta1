import { Content } from '../types';

// Action verbs and indicators are already defined above...

export interface ExtractedTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  confidence: number;
}

export function extractTasks(content: Content): ExtractedTask[] {
  const tasks: ExtractedTask[] = [];
  const sentences = content.content.split(/[.。!！?？\n]+/).filter(Boolean);

  sentences.forEach(sentence => {
    const confidence = calculateTaskConfidence(sentence);
    if (confidence >= 0.6) { // Only consider high confidence matches
      const priority = determinePriority(sentence);
      const dueDate = extractDueDate(sentence);
      
      tasks.push({
        title: sentence.trim(),
        description: `从内容"${content.title}"中提取的任务`,
        priority,
        dueDate,
        confidence
      });
    }
  });

  return tasks;
}

function determinePriority(text: string): 'low' | 'medium' | 'high' {
  const lowerText = text.toLowerCase();
  
  for (const [priority, indicators] of Object.entries(PRIORITY_INDICATORS)) {
    if (indicators.some(indicator => lowerText.includes(indicator.toLowerCase()))) {
      return priority as 'low' | 'medium' | 'high';
    }
  }
  
  return 'medium'; // Default priority
}

function extractDueDate(text: string): string | undefined {
  for (const pattern of TIME_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const dateStr = match[0];
      try {
        // Convert relative dates to absolute dates
        const date = parseRelativeDate(dateStr);
        return date.toISOString();
      } catch (e) {
        console.error('Failed to parse date:', e);
      }
    }
  }
  return undefined;
}

function parseRelativeDate(dateStr: string): Date {
  const now = new Date();
  
  // Chinese date parsing
  if (dateStr.includes('今天')) return now;
  if (dateStr.includes('明天')) return new Date(now.setDate(now.getDate() + 1));
  if (dateStr.includes('后天')) return new Date(now.setDate(now.getDate() + 2));
  if (dateStr.includes('下周')) return new Date(now.setDate(now.getDate() + 7));
  if (dateStr.includes('下个月')) {
    return new Date(now.setMonth(now.getMonth() + 1));
  }
  
  // English date parsing
  if (dateStr.includes('today')) return now;
  if (dateStr.includes('tomorrow')) return new Date(now.setDate(now.getDate() + 1));
  if (dateStr.includes('next week')) return new Date(now.setDate(now.getDate() + 7));
  if (dateStr.includes('next month')) {
    return new Date(now.setMonth(now.getMonth() + 1));
  }
  
  // Default to original date string if no relative date found
  return new Date(dateStr);
}