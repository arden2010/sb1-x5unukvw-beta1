import { useState, useEffect, useCallback } from 'react';
import Button from '../common/Button';

interface ShortcutEditorProps {
  action: string;
  currentShortcut: string;
  onUpdate: (action: string, shortcut: string) => void;
}

export default function ShortcutEditor({
  action,
  currentShortcut,
  onUpdate
}: ShortcutEditorProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);

  const startRecording = () => {
    setIsRecording(true);
    setKeys([]);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isRecording) return;
    e.preventDefault();

    const newKeys = new Set<string>();
    if (e.ctrlKey) newKeys.add('Ctrl');
    if (e.altKey) newKeys.add('Alt');
    if (e.shiftKey) newKeys.add('Shift');
    if (!['Control', 'Alt', 'Shift'].includes(e.key)) {
      newKeys.add(e.key.toUpperCase());
    }

    setKeys(Array.from(newKeys));
  }, [isRecording]);

  const stopRecording = () => {
    setIsRecording(false);
    if (keys.length > 0) {
      onUpdate(action, keys.join('+'));
    }
  };

  useEffect(() => {
    if (isRecording) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecording, handleKeyDown]);

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">{action}</span>
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            readOnly
            value={isRecording ? keys.join(' + ') || '按下快捷键...' : currentShortcut}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        variant={isRecording ? 'secondary' : 'primary'}
        size="sm"
      >
        {isRecording ? '完成' : '修改'}
      </Button>
    </div>
  );
}