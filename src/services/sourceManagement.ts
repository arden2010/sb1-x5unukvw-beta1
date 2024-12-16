import { Source } from '../types';
import { db } from './db';

export class SourceManagementService {
  static async addSource(source: Omit<Source, 'id'>): Promise<Source> {
    const newSource: Source = {
      id: crypto.randomUUID(),
      ...source
    };
    
    await db.sources.add(newSource);
    return newSource;
  }

  static async updateSource(id: string, updates: Partial<Source>): Promise<void> {
    await db.sources.update(id, updates);
  }

  static async removeSource(id: string): Promise<void> {
    await db.sources.delete(id);
  }

  static async getSources(): Promise<Source[]> {
    return db.sources.toArray();
  }
}