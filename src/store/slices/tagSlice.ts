import { StateCreator } from 'zustand';
import { Tag } from '../../types';

export interface TagSlice {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  removeTag: (id: string) => void;
}

export const createTagSlice: StateCreator<TagSlice> = (set) => ({
  tags: [],
  addTag: (tag) =>
    set((state) => ({ tags: [...state.tags, tag] })),
  updateTag: (id, updates) =>
    set((state) => ({
      tags: state.tags.map((tag) =>
        tag.id === id ? { ...tag, ...updates } : tag
      ),
    })),
  removeTag: (id) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    })),
});