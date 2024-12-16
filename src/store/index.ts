import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContentSlice, createContentSlice } from './slices/contentSlice';
import { TaskSlice, createTaskSlice } from './slices/taskSlice';
import { SourceSlice, createSourceSlice } from './slices/sourceSlice';
import { TagSlice, createTagSlice } from './slices/tagSlice';
import { SettingsSlice, createSettingsSlice } from './slices/settingsSlice';

export type StoreState = ContentSlice & TaskSlice & SourceSlice & TagSlice & SettingsSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createContentSlice(...a),
      ...createTaskSlice(...a),
      ...createSourceSlice(...a),
      ...createTagSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: 'ictms-storage',
      version: 1,
      partialize: (state) => ({
        contents: state.contents,
        tasks: state.tasks,
        tags: state.tags,
        sources: state.sources,
        settings: state.settings,
      }),
    }
  )
);