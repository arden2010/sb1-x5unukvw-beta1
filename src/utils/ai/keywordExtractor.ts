import { STOP_WORDS } from '../constants/stopWords';

export function extractKeywords(text: string): string[] {
  if (!text?.trim()) return [];

  try {
    // 1. 分词并清理
    const words = text.toLowerCase()
      .match(/[\u4e00-\u9fa5]+|[a-z]+/g) || [];
    
    // 2. 过滤停用词和短词
    const filtered = words.filter(word => 
      word.length > 1 && !STOP_WORDS.includes(word)
    );
    
    // 3. 计算词频
    const frequency: Record<string, number> = {};
    filtered.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    // 4. 按频率排序并返回前10个关键词
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  } catch (error) {
    console.warn('Keyword extraction failed:', error);
    return [];
  }
}