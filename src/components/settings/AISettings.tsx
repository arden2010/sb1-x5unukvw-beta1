import { AIConfig } from '../../types/ai';
import { AI_PROVIDERS } from '../../constants/aiProviders';

interface AISettingsProps {
  config: AIConfig;
  onUpdate: (config: AIConfig) => void;
}

export default function AISettings({ config, onUpdate }: AISettingsProps) {
  const handleProviderChange = (providerId: string) => {
    onUpdate({
      ...config,
      selectedProvider: providerId
    });
  };

  const handleApiKeyChange = (providerId: string, apiKey: string) => {
    onUpdate({
      ...config,
      providers: {
        ...config.providers,
        [providerId]: {
          ...config.providers[providerId],
          apiKey
        }
      }
    });
  };

  const providers = config.providers || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">AI 设置</h3>
          <p className="mt-1 text-sm text-gray-500">
            配置AI服务提供商和相关设置
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="ai-enabled"
            checked={config.enabled}
            onChange={(e) => onUpdate({
              ...config,
              enabled: e.target.checked
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="ai-enabled" className="ml-2 text-sm text-gray-900">
            启用 AI 增强
          </label>
        </div>
      </div>

      {config.enabled && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              选择 AI 提供商
            </label>
            <select
              value={config.selectedProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {AI_PROVIDERS.filter(p => p.isEnabled).map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          {AI_PROVIDERS.filter(p => p.isEnabled).map(provider => (
            <div
              key={provider.id}
              className={provider.id === config.selectedProvider ? 'block' : 'hidden'}
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">{provider.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{provider.description}</p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    API Key
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="password"
                      value={providers[provider.id]?.apiKey || ''}
                      onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                      className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder={`输入 ${provider.name} 的 API Key`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 text-sm"
                      >
                        获取
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}