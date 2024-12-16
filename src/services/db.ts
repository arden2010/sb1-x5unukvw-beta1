import Dexie, { Table } from 'dexie';
import { Content, Task, Tag, Source } from '../types';

export class ICTMSDatabase extends Dexie {
  contents!: Table<Content>;
  tasks!: Table<Task>;
  tags!: Table<Tag>;
  sources!: Table<Source>;

  constructor() {
    super('ictms');
    
    this.version(1).stores({
      contents: '++id, type, createdAt, updatedAt, source',
      tasks: '++id, status, priority, dueDate, createdAt',
      tags: '++id, name',
      sources: '++id, type'
    });
  }
}

export const db = new ICTMSDatabase();