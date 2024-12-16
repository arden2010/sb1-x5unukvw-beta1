import { Content } from '../../types';
import { extractKeywords } from './keywordExtractor';
import { normalizeTag } from '../text/normalizer';

export class TagGenerator {
  static async generateTags(content: Content): Promise<string[]> {
    try {
      // 1. 从内容中提取关键词
      const keywords = extractKeywords(content.content);
      
      // 2. 从标题中提取关键词
      const titleKeywords = extractKeywords(content.title);
      
      // 3. 合并关键词并去重
      const allKeywords = new Set([...keywords, ...titleKeywords]);
      
      // 4. 标准化标签
      const tags = Array.from(allKeywords)
        .map(keyword => normalizeTag(keyword))
        .filter(Boolean);
      
      // 5. 限制标签数量（最多5个）
      return tags.slice(0, 5);
    } catch (error) {
      console.warn('Tag generation failed:', error);
      return [];
    }
  }
}