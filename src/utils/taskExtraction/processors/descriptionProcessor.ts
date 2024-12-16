import { Content } from '../../../types';

export function generateDescription(segment: string, content: Content): string {
  const parts: string[] = [];

  // 1. 添加来源信息
  parts.push(`来源：${content.title}`);

  // 2. 提取上下文（如果有）
  const context = extractContext(segment, content.content);
  if (context) {
    parts.push(`上下文：${context}`);
  }

  // 3. 添加补充信息
  const supplementary = extractSupplementaryInfo(segment);
  if (supplementary) {
    parts.push(supplementary);
  }

  return parts.join('\n');
}

function extractContext(segment: string, fullContent: string): string | null {
  try {
    const index = fullContent.indexOf(segment);
    if (index === -1) return null;

    // 获取段落前后的文本
    const before = fullContent.slice(Math.max(0, index - 100), index).trim();
    const after = fullContent.slice(index + segment.length, index + segment.length + 100).trim();

    const parts: string[] = [];
    if (before) parts.push(`...${before}`);
    if (after) parts.push(`${after}...`);

    return parts.join(' ');
  } catch (error) {
    console.warn('Context extraction failed:', error);
    return null;
  }
}

function extractSupplementaryInfo(text: string): string | null {
  const info: string[] = [];

  // 提取补充说明
  const notes = text.match(/[（(]([^）)]+)[）)]/);
  if (notes) {
    info.push(`补充说明：${notes[1]}`);
  }

  // 提取条件
  if (text.includes('如果') || text.includes('当')) {
    const condition = text.match(/(如果|当)([^，。]+)/);
    if (condition) {
      info.push(`条件：${condition[0]}`);
    }
  }

  return info.length > 0 ? info.join('\n') : null;
}