import { Content } from '../../types';
import { useStore } from '../../store';

interface AnalysisResult {
  summary: string;
  keywords: string[];
  topics: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export class ContentAnalysisService {
  static async analyze(contents: Content[]): Promise<AnalysisResult> {
    const { settings } = useStore.getState();
    
    try {
      if (settings.ai.enabled) {
        // If AI is enabled, use the selected provider
        return this.analyzeWithAI(contents);
      } else {
        // Otherwise, use local analysis
        return this.analyzeLocally(contents);
      }
    } catch (error) {
      console.error('Content analysis failed:', error);
      return this.analyzeLocally(contents);
    }
  }

  private static analyzeLocally(contents: Content[]): AnalysisResult {
    // Simple local analysis
    const allText = contents.map(c => c.content).join(' ');
    const words = allText.split(/\s+/);
    
    // Basic keyword extraction
    const keywords = this.extractKeywords(words);
    
    // Basic topic extraction
    const topics = Array.from(new Set(
      contents.flatMap(c => c.tags)
    )).slice(0, 5);
    
    // Simple sentiment analysis
    const sentiment = this.analyzeSentiment(allText);
    
    return {
      summary: this.generateSummary(contents),
      keywords,
      topics,
      sentiment
    };
  }

  private static async analyzeWithAI(contents: Content[]): Promise<AnalysisResult> {
    // TODO: Implement AI-based analysis using selected provider
    return this.analyzeLocally(contents);
  }

  private static extractKeywords(words: string[]): string[] {
    const frequency: Record<string, number> = {};
    words.forEach(word => {
      if (word.length > 2) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });
    
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  }

  private static analyzeSentiment(text: string): AnalysisResult['sentiment'] {
    const positiveWords = ['好', '优秀', '完美', 'good', 'great', 'excellent'];
    const negativeWords = ['差', '糟糕', '失败', 'bad', 'poor', 'fail'];
    
    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private static generateSummary(contents: Content[]): string {
    const totalCount = contents.length;
    const imageCount = contents.filter(c => c.type === 'image').length;
    const textCount = totalCount - imageCount;
    const recentCount = contents.filter(c => 
      new Date(c.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;

    return `最近24小时内新增${recentCount}条内容。共有${totalCount}条内容，其中文本${textCount}条，图片${imageCount}条。`;
  }
}