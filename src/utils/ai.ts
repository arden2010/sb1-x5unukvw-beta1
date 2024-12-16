import { Content } from '../types';

export const extractKeywords = (text: string): string[] => {
  // Simple keyword extraction based on word frequency
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequency: Record<string, number> = {};
  
  words.forEach(word => {
    if (word.length > 2) { // Only consider words longer than 2 characters
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });
  
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);
};

export const suggestTags = async (content: Content): Promise<string[]> => {
  const keywords = extractKeywords(content.content);
  return keywords.map(keyword => keyword.charAt(0).toUpperCase() + keyword.slice(1));
};