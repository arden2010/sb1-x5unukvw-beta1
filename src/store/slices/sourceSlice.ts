import { StateCreator } from 'zustand';
import { Source } from '../../types';

export interface SourceSlice {
  sources: Source[];
  addSource: (source: Source) => void;
  updateSource: (id: string, updates: Partial<Source>) => void;
  removeSource: (id: string) => void;
}

export const createSourceSlice: StateCreator<SourceSlice> = (set) => ({
  sources: [],
  addSource: (source) =>
    set((state) => ({ sources: [...state.sources, source] })),
  updateSource: (id, updates) =>
    set((state) => ({
      sources: state.sources.map((source) =>
        source.id === id ? { ...source, ...updates } : source
      ),
    })),
  removeSource: (id) =>
    set((state) => ({
      sources: state.sources.filter((source) => source.id !== id),
    })),
});