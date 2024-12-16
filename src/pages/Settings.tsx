import React from 'react';
import { useStore } from '../store';
import ShortcutEditor from '../components/settings/ShortcutEditor';
import AISettings from '../components/settings/AISettings';

export default function Settings() {
  const { settings, updateSettings } = useStore();

  const handleShortcutUpdate = (action: string, shortcut: string) => {
    updateSettings({
      shortcuts: {
        ...settings.shortcuts,
        [action]: shortcut
      }
    });
  };

  const handleAIUpdate = (aiConfig: typeof settings.ai) => {
    updateSettings({ ai: aiConfig });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">设置</h1>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">快捷键设置</h2>
          <div className="space-y-4">
            <ShortcutEditor
              action="截图"
              currentShortcut={settings.shortcuts.screenshot}
              onUpdate={(_, shortcut) => handleShortcutUpdate('screenshot', shortcut)}
            />
          </div>
        </div>

        <div className="p-6">
          <AISettings
            config={settings.ai}
            onUpdate={handleAIUpdate}
          />
        </div>

        {/* Remove OCR language selection since it's automatic now */}
      </div>
    </div>
  );
}