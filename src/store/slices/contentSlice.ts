import { StateCreator } from 'zustand';
import { Content } from '../../types';

const UNDO_WINDOW = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

interface DeletedContent {
  content: Content;
  deletedAt: number;
}

export interface ContentSlice {
  contents: Content[];
  deletedContents: DeletedContent[];
  addContent: (content: Content) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  removeContent: (id: string) => void;
  undoDelete: (id: string) => void;
  clearOldDeletedContents: () => void;
}

export const createContentSlice: StateCreator<ContentSlice> = (set) => ({
  contents: [],
  deletedContents: [],
  
  addContent: (content) => {
    const newContent = {
      ...content,
      createdAt: new Date(content.createdAt).toISOString(),
      updatedAt: new Date(content.updatedAt).toISOString()
    };
    set((state) => ({ contents: [...state.contents, newContent] }));
  },
  
  updateContent: (id, updates) =>
    set((state) => ({
      contents: state.contents.map((content) =>
        content.id === id 
          ? { 
              ...content, 
              ...updates,
              updatedAt: new Date().toISOString()
            } 
          : content
      ),
    })),
  
  removeContent: (id) =>
    set((state) => {
      const contentToDelete = state.contents.find(c => c.id === id);
      if (!contentToDelete) return state;

      return {
        contents: state.contents.filter(c => c.id !== id),
        deletedContents: [
          ...state.deletedContents,
          {
            content: contentToDelete,
            deletedAt: Date.now()
          }
        ]
      };
    }),
  
  undoDelete: (id) =>
    set((state) => {
      const deletedItem = state.deletedContents.find(d => d.content.id === id);
      if (!deletedItem) return state;

      return {
        contents: [...state.contents, deletedItem.content],
        deletedContents: state.deletedContents.filter(d => d.content.id !== id)
      };
    }),
  
  clearOldDeletedContents: () =>
    set((state) => {
      const now = Date.now();
      return {
        deletedContents: state.deletedContents.filter(
          d => now - d.deletedAt < UNDO_WINDOW
        )
      };
    })
});