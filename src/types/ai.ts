// Define AI-related types
export interface AIProvider {
  id: string;
  name: string;
  description: string;
  url: string;
  apiKeyName: string;
  isEnabled: boolean;
}

export interface AIProviderConfig {
  apiKey: string;
  options: Record<string, any>;
}

export interface AIConfig {
  enabled: boolean;
  selectedProvider: string;
  providers: Record<string, AIProviderConfig>;
}

// Add validation helpers
export function validateAIConfig(config: AIConfig): boolean {
  return !!(
    config &&
    typeof config.enabled === 'boolean' &&
    typeof config.selectedProvider === 'string' &&
    config.providers &&
    typeof config.providers === 'object'
  );
}