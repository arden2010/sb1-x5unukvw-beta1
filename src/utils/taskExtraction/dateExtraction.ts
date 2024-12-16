import { TIME_PATTERNS } from './constants';

export function extractDueDate(text: string): string | undefined {
  for (const pattern of TIME_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const dateStr = match[0];
      try {
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
  
  // Chinese relative dates
  if (dateStr.includes('今天')) return now;
  if (dateStr.includes('明天')) return new Date(now.setDate(now.getDate() + 1));
  if (dateStr.includes('后天')) return new Date(now.setDate(now.getDate() + 2));
  if (dateStr.includes('下周')) return new Date(now.setDate(now.getDate() + 7));
  if (dateStr.includes('下个月')) return new Date(now.setMonth(now.getMonth() + 1));
  
  // Chinese specific dates
  const daysLaterMatch = dateStr.match(/(\d{1,2})天后/);
  if (daysLaterMatch) {
    return new Date(now.setDate(now.getDate() + parseInt(daysLaterMatch[1])));
  }
  
  // English relative dates
  if (dateStr.toLowerCase().includes('today')) return now;
  if (dateStr.toLowerCase().includes('tomorrow')) return new Date(now.setDate(now.getDate() + 1));
  if (dateStr.toLowerCase().includes('next week')) return new Date(now.setDate(now.getDate() + 7));
  if (dateStr.toLowerCase().includes('next month')) return new Date(now.setMonth(now.getMonth() + 1));
  
  // English specific dates
  const inDaysMatch = dateStr.match(/in (\d{1,2}) days/i);
  if (inDaysMatch) {
    return new Date(now.setDate(now.getDate() + parseInt(inDaysMatch[1])));
  }
  
  // Try parsing as absolute date
  const parsedDate = new Date(dateStr);
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  }
  
  return now;
}