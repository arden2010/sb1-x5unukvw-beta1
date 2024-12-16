export function normalizeTag(tag: string): string {
  if (!tag?.trim()) return '';

  try {
    // 1. 移除特殊字符
    let normalized = tag.trim()
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
      .toLowerCase();
    
    // 2. 确保标签长度合适
    if (normalized.length < 2) return '';
    if (normalized.length > 20) {
      normalized = normalized.slice(0, 20);
    }
    
    // 3. 首字母大写（如果是英文）
    if (/^[a-z]/.test(normalized)) {
      normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
    }
    
    return normalized;
  } catch (error) {
    console.warn('Tag normalization failed:', error);
    return '';
  }
}