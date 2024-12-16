import { ACTION_VERBS_CN, ACTION_VERBS_EN } from '../constants';

export function calculateConfidence(text: string): number {
  try {
    const lowerText = text.toLowerCase();
    let confidence = 0;

    // 检查是否包含问候语或非任务内容
    if (containsGreetings(text) || isNonTaskContent(text)) {
      return 0;
    }

    // 检查是否包含发票、订单等关键业务词
    if (containsBusinessTerms(text)) {
      confidence += 0.6;
    }

    // 检查动作动词
    const hasChineseVerb = ACTION_VERBS_CN.some(verb => text.includes(verb));
    const hasEnglishVerb = ACTION_VERBS_EN.some(verb => lowerText.includes(verb));
    
    if (hasChineseVerb || hasEnglishVerb) {
      confidence += 0.3;
    }

    // 检查任务特征
    if (text.match(/^(需要|必须|应该|要|得|Please|Must|Should|Need|Will|To|[A-Z])/i)) {
      confidence += 0.2;
    }

    // 检查时间指示词
    if (text.match(/(今天|明天|后天|下周|下个月|today|tomorrow|next|by|until|deadline)/i)) {
      confidence += 0.2;
    }

    // 降低问题和非任务内容的权重
    if (text.match(/[?？]/) || text.match(/^(什么|how|what|why|when|where|who)/i)) {
      confidence -= 0.4;
    }

    return Math.max(0, Math.min(1, confidence));
  } catch (error) {
    console.warn('Confidence calculation failed:', error);
    return 0;
  }
}

function containsBusinessTerms(text: string): boolean {
  const businessTerms = [
    '发票', '订单', '采购', 'PO', 'invoice', 'order',
    '付款', '对账', '核对', '确认', '查收', '检查'
  ];

  return businessTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));
}

function containsGreetings(text: string): boolean {
  const greetings = [
    'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
    'hope you are', 'how are you', '你好', '早上好', '下午好', '晚上好',
    'regards', 'best wishes', '祝好', '此致', '敬礼'
  ];

  const lowerText = text.toLowerCase();
  return greetings.some(greeting => lowerText.includes(greeting));
}

function isNonTaskContent(text: string): boolean {
  const nonTaskPatterns = [
    // 问候语
    /^(hello|hi|hey|good|dear)/i,
    /^(你好|早上好|下午好|晚上好)/,
    
    // 感谢语
    /thank you|thanks|appreciate/i,
    /谢谢|感谢/,
    
    // 结束语
    /regards|sincerely|best wishes/i,
    /此致|敬礼|祝好/,
    
    // 疑问句
    /^(what|when|where|why|who|how)/i,
    /^(什么|何时|哪里|为什么|谁|怎么)/,
    
    // 陈述句
    /^(FYI|just|letting you know)/i,
    /^(供参考|仅供参考|告知)/
  ];

  return nonTaskPatterns.some(pattern => pattern.test(text));
}