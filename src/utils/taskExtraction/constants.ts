import { TaskIndicator } from './types';

// Action verbs that indicate tasks
export const ACTION_VERBS = {
  // Development & Technical
  development: [
    'develop', 'implement', 'code', 'program', 'build', 'create', 'design',
    'architect', 'refactor', 'optimize', 'debug', 'test', 'deploy', 'maintain',
    'integrate', 'configure', 'setup', 'install', 'migrate', 'upgrade',
    '开发', '实现', '编码', '构建', '创建', '设计', '重构', '优化', '调试', 
    '测试', '部署', '维护', '集成', '配置', '安装', '迁移', '升级'
  ],

  // Content & Documentation
  content: [
    'write', 'document', 'draft', 'edit', 'review', 'proofread', 'translate',
    'publish', 'update', 'revise', 'summarize', 'describe', 'explain',
    '写', '编写', '草拟', '编辑', '审查', '校对', '翻译', '发布', '更新',
    '修订', '总结', '描述', '说明'
  ],

  // Analysis & Research
  analysis: [
    'analyze', 'research', 'investigate', 'study', 'evaluate', 'assess',
    'examine', 'explore', 'verify', 'validate', 'check', 'monitor',
    '分析', '研究', '调查', '学习', '评估', '评价', '检查', '探索',
    '验证', '确认', '监控'
  ],

  // Management & Organization
  management: [
    'manage', 'organize', 'coordinate', 'plan', 'schedule', 'arrange',
    'track', 'report', 'supervise', 'lead', 'direct', 'delegate',
    '管理', '组织', '协调', '计划', '安排', '跟踪', '报告', '监督',
    '领导', '指导', '分配'
  ],

  // Communication & Collaboration
  communication: [
    'contact', 'discuss', 'present', 'share', 'send', 'submit', 'respond',
    'reply', 'follow up', 'notify', 'inform', 'announce', 'communicate',
    '联系', '讨论', '展示', '分享', '发送', '提交', '回复', '跟进',
    '通知', '告知', '宣布', '沟通'
  ],

  // Process & Action
  process: [
    'process', 'handle', 'execute', 'perform', 'complete', 'finish',
    'resolve', 'fix', 'solve', 'address', 'prepare', 'conduct',
    '处理', '执行', '完成', '解决', '修复', '解答', '准备', '开展'
  ]
};

// Combine all verbs into a single array
export const ALL_ACTION_VERBS = Object.values(ACTION_VERBS).flat();

// Task priority indicators
export const PRIORITY_INDICATORS = {
  high: [
    // Urgency indicators
    '紧急', '立即', '马上', '尽快', '优先', 'urgent', 'immediate', 'asap',
    'priority', 'critical', 'crucial', 'vital', 'essential',
    // Importance indicators
    '重要', '关键', '必须', 'important', 'must', 'required', 'mandatory',
    // Deadline pressure
    '截止', '期限', 'deadline', 'due', 'by today', 'by tomorrow',
    // Business impact
    '高优先级', '高优', 'high priority', 'blocking', 'showstopper'
  ],
  medium: [
    '普通', '一般', '正常', '标准', 'normal', 'regular', 'standard',
    '中优先级', '中优', 'medium priority', 'moderate'
  ],
  low: [
    '低优先级', '低优', '不急', '可延后', '有空', '随时',
    'low priority', 'can be delayed', 'whenever', 'flexible',
    'nice to have', 'optional', 'when possible'
  ]
};

// Task indicators with confidence scores
export const TASK_INDICATORS: TaskIndicator[] = [
  { pattern: /^(need|must|should|will|have to|please)/i, confidence: 0.4 },
  { pattern: /^(需要|必须|应该|要|得|请|建议)/, confidence: 0.4 },
  { pattern: /task:|todo:|action item:|待办:|任务:|工作项:/, confidence: 0.5 },
  { pattern: /^[-*•]|\d+[.、)]/, confidence: 0.3 },
  { pattern: /by (today|tomorrow|next|this)/, confidence: 0.4 },
  { pattern: /(今天|明天|后天|下周|下个月).*(完成|做|处理)/, confidence: 0.4 }
];