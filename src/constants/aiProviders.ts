import { AIProvider } from '../types/ai';

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'ChatGPT和GPT系列模型，提供强大的自然语言处理能力',
    url: 'https://platform.openai.com',
    apiKeyName: 'OPENAI_API_KEY',
    isEnabled: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Claude系列模型，擅长长文本理解和生成',
    url: 'https://anthropic.com',
    apiKeyName: 'ANTHROPIC_API_KEY',
    isEnabled: true
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google最新的AI模型，支持多模态理解',
    url: 'https://ai.google.dev',
    apiKeyName: 'GEMINI_API_KEY',
    isEnabled: true
  },
  {
    id: 'qianfan',
    name: '百度千帆',
    description: '百度智能云AI平台，提供文心一言等模型',
    url: 'https://cloud.baidu.com/product/wenxinworkshop',
    apiKeyName: 'QIANFAN_API_KEY',
    isEnabled: true
  },
  {
    id: 'dashscope',
    name: '阿里通义千问',
    description: '阿里云AI平台，提供通义千问等模型',
    url: 'https://dashscope.aliyun.com',
    apiKeyName: 'DASHSCOPE_API_KEY',
    isEnabled: true
  },
  {
    id: 'zhipu',
    name: '智谱 ChatGLM',
    description: '智谱AI开放平台，提供ChatGLM等模型',
    url: 'https://open.bigmodel.cn',
    apiKeyName: 'ZHIPU_API_KEY',
    isEnabled: true
  }
];