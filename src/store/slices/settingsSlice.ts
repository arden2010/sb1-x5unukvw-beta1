import { StateCreator } from 'zustand';
import { AIConfig } from '../../types/ai';
import { AI_PROVIDERS } from '../../constants/aiProviders';

export interface Settings {
  shortcuts: {
    [key: string]: string;
  };
  ocr: {
    languages: string[];
    confidence: number;
  };
  ai: AIConfig;
}

export interface SettingsSlice {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

// Initialize providers with empty configs
const initialProviders = AI_PROVIDERS.reduce((acc, provider) => ({
  ...acc,
  [provider.id]: { 
    apiKey: '',
    options: {}
  }
}), {});

const defaultSettings: Settings = {
  shortcuts: {
    screenshot: 'Ctrl+Alt+A'
  },
  ocr: {
    languages: ['eng', 'chi_sim'],
    confidence: 0.6
  },
  ai: {
    enabled: true,
    selectedProvider: AI_PROVIDERS[0]?.id || 'openai',
    providers: initialProviders
  }
};

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  settings: defaultSettings,
  updateSettings: (updates) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...updates,
        // Ensure AI provider configs are preserved
        ai: updates.ai ? {
          ...state.settings.ai,
          ...updates.ai,
          providers: {
            ...state.settings.ai.providers,
            ...(updates.ai.providers || {})
          }
        } : state.settings.ai
      }
    }))
});