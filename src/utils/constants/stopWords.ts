// 中文停用词
const CHINESE_STOP_WORDS = [
  '的', '了', '和', '是', '就', '都', '而', '及', '与', '着',
  '或', '一个', '没有', '我们', '你们', '他们', '它们', '这个',
  '那个', '这些', '那些', '这样', '那样', '之', '的话', '说'
];

// 英文停用词
const ENGLISH_STOP_WORDS = [
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
  'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
  'that', 'the', 'to', 'was', 'were', 'will', 'with'
];

export const STOP_WORDS = [...CHINESE_STOP_WORDS, ...ENGLISH_STOP_WORDS];