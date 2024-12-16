import { useState } from 'react';
import { Source } from '../../types';
import Button from '../common/Button';

interface SourceFormProps {
  onSubmit: (sourceData: Omit<Source, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isLoading?: boolean;
}

export default function SourceForm({ onSubmit, isLoading }: SourceFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [config, setConfig] = useState('{}');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const configObj = JSON.parse(config);
      onSubmit({
        name,
        type,
        config: configObj
      });

      // Reset form
      setName('');
      setType('');
      setConfig('{}');
    } catch (err) {
      console.error('Invalid config JSON:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Source Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Source Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select type...</option>
          <option value="email">Email</option>
          <option value="webpage">Webpage</option>
          <option value="file">File System</option>
          <option value="api">API</option>
        </select>
      </div>

      <div>
        <label htmlFor="config" className="block text-sm font-medium text-gray-700">
          Configuration (JSON)
        </label>
        <textarea
          id="config"
          value={config}
          onChange={(e) => setConfig(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Add Source
        </Button>
      </div>
    </form>
  );
}