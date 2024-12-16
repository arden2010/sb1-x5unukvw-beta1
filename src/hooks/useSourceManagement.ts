import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { Source } from '../types';
import { SourceManagementService } from '../services/sourceManagement';

export function useSourceManagement() {
  const { sources, addSource, updateSource, removeSource } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSource = useCallback(async (sourceData: Omit<Source, 'id'>) => {
    setIsProcessing(true);
    setError(null);

    try {
      const source = await SourceManagementService.addSource(sourceData);
      addSource(source);
      return source;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create source');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [addSource]);

  const modifySource = useCallback(async (id: string, updates: Partial<Source>) => {
    setIsProcessing(true);
    setError(null);

    try {
      await SourceManagementService.updateSource(id, updates);
      updateSource(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update source');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [updateSource]);

  const deleteSource = useCallback(async (id: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      await SourceManagementService.removeSource(id);
      removeSource(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete source');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [removeSource]);

  return {
    sources,
    createSource,
    modifySource,
    deleteSource,
    isProcessing,
    error
  };
}