import { Content } from '../../types';
import { db } from '../db';

export class ContentStorageService {
  static async store(content: Content): Promise<Content> {
    try {
      // Validate content
      if (!this.validateContent(content)) {
        throw new Error('Invalid content data');
      }

      // Store in database
      const id = await db.contents.add(content);
      if (!id) {
        throw new Error('Failed to store content');
      }

      return content;
    } catch (error) {
      console.error('Content storage failed:', error);
      throw new Error('Failed to store content');
    }
  }

  static async update(id: string, updates: Partial<Content>): Promise<void> {
    try {
      const count = await db.contents.update(id, {
        ...updates,
        updatedAt: new Date().toISOString()
      });

      if (count === 0) {
        throw new Error('Content not found');
      }
    } catch (error) {
      console.error('Content update failed:', error);
      throw new Error('Failed to update content');
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const count = await db.contents.delete(id);
      if (count === 0) {
        throw new Error('Content not found');
      }
    } catch (error) {
      console.error('Content deletion failed:', error);
      throw new Error('Failed to delete content');
    }
  }

  private static validateContent(content: Content): boolean {
    return !!(
      content &&
      content.id &&
      content.type &&
      content.content &&
      content.createdAt &&
      content.updatedAt
    );
  }
}