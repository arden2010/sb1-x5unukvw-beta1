import { Content } from '../types';
import { extractKeywords } from './ai';

export const processContent = async (content: Content): Promise<Content> => {
  // Extract keywords for better search and organization
  const keywords = extractKeywords(content.content);
  
  // Generate a meaningful title if none exists
  if (!content.title || content.title.trim() === '') {
    content.title = content.content.slice(0, 50) + '...';
  }

  // Ensure content has basic metadata
  content.metadata = {
    ...content.metadata,
    keywords,
    processedAt: new Date().toISOString()
  };

  return content;
};