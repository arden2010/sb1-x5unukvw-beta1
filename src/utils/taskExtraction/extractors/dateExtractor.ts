import { DatePattern } from '../types';

export class DateExtractor {
  private static datePatterns: DatePattern[] = [
    // Absolute dates
    {
      pattern: /(\d{4})[/-](\d{1,2})[/-](\d{1,2})/,
      extract: (matches) => {
        const [_, year, month, day] = matches;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
    },
    {
      pattern: /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/,
      extract: (matches) => {
        const [_, month, day, year] = matches;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
    },
    {
      pattern: /(\d{1,2})月(\d{1,2})日/,
      extract: (matches) => {
        const [_, month, day] = matches;
        const year = new Date().getFullYear();
        return new Date(year, parseInt(month) - 1, parseInt(day));
      }
    },

    // Relative dates - Chinese
    {
      pattern: /今天|today/i,
      extract: () => new Date()
    },
    {
      pattern: /明天|tomorrow/i,
      extract: () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
      }
    },
    {
      pattern: /后天/,
      extract: () => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        return date;
      }
    },
    {
      pattern: /下周[一二三四五六日天]/,
      extract: (matches) => {
        const weekdayMap: Record<string, number> = {
          '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '日': 0, '天': 0
        };
        const targetDay = weekdayMap[matches[0].slice(-1)];
        const date = new Date();
        const currentDay = date.getDay();
        const daysToAdd = (targetDay + 7 - currentDay) % 7 + 7;
        date.setDate(date.getDate() + daysToAdd);
        return date;
      }
    },
    {
      pattern: /(\d+)(天|周|月)后/,
      extract: (matches) => {
        const [_, amount, unit] = matches;
        const date = new Date();
        const value = parseInt(amount);
        
        switch (unit) {
          case '天':
            date.setDate(date.getDate() + value);
            break;
          case '周':
            date.setDate(date.getDate() + value * 7);
            break;
          case '月':
            date.setMonth(date.getMonth() + value);
            break;
        }
        return date;
      }
    },

    // Relative dates - English
    {
      pattern: /next (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
      extract: (matches) => {
        const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const targetDay = weekdays.indexOf(matches[1].toLowerCase());
        const date = new Date();
        const currentDay = date.getDay();
        const daysToAdd = (targetDay + 7 - currentDay) % 7 + 7;
        date.setDate(date.getDate() + daysToAdd);
        return date;
      }
    },
    {
      pattern: /in (\d+) (day|week|month)s?/i,
      extract: (matches) => {
        const [_, amount, unit] = matches;
        const date = new Date();
        const value = parseInt(amount);
        
        switch (unit.toLowerCase()) {
          case 'day':
            date.setDate(date.getDate() + value);
            break;
          case 'week':
            date.setDate(date.getDate() + value * 7);
            break;
          case 'month':
            date.setMonth(date.getMonth() + value);
            break;
        }
        return date;
      }
    }
  ];

  static extract(text: string): string | undefined {
    try {
      for (const { pattern, extract } of this.datePatterns) {
        const matches = text.match(pattern);
        if (matches) {
          const date = extract(matches);
          if (date && !isNaN(date.getTime())) {
            return date.toISOString();
          }
        }
      }
    } catch (error) {
      console.warn('Date extraction failed:', error);
    }
    return undefined;
  }
}