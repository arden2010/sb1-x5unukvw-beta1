import { ACTION_VERBS_CN, ACTION_VERBS_EN } from './constants';

export function calculateTaskConfidence(text: string): number {
  const lowerText = text.toLowerCase();
  let confidence = 0;

  // Check for action verbs
  const hasChineseVerb = ACTION_VERBS_CN.some(verb => text.includes(verb));
  const hasEnglishVerb = ACTION_VERBS_EN.some(verb => lowerText.includes(verb));
  
  if (hasChineseVerb || hasEnglishVerb) {
    confidence += 0.5; // Increased weight for action verbs
  }

  // Check for task-like sentence structure
  if (text.length > 10 && text.length < 200) {
    confidence += 0.2;
  }

  // Check for imperative mood or task-like beginning
  if (text.match(/^(需要|必须|应该|要|得|Please|Must|Should|Need|Will|To|[A-Z])/i)) {
    confidence += 0.3;
  }

  // Check for actionable content
  if (text.match(/[\u4e00-\u9fa5a-zA-Z]+[，。：:]/)) {
    confidence += 0.2;
  }

  // Check for time-related words
  if (text.match(/(今天|明天|后天|下周|下个月|today|tomorrow|next|by|until|deadline)/i)) {
    confidence += 0.2;
  }

  // Penalize questions and non-task content
  if (text.match(/[?？]/) || text.match(/^(什么|how|what|why|when|where|who)/i)) {
    confidence -= 0.4;
  }

  // Ensure confidence is between 0 and 1
  return Math.max(0, Math.min(1, confidence));
}