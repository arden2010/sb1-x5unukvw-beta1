// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Content types
export interface Content extends BaseEntity {
  type: 'text' | 'image';
  title: string;
  content: string;
  tags: string[];
  source: string;
  metadata: {
    wordCount?: number;
    processedAt?: string;
    originalImage?: string;
    thumbnail?: string;
    confidence?: number;
    keywords?: string[];
    fileName?: string;
    fileType?: string;
    fileSize?: number;
  };
}

// Task types
export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task extends BaseEntity {
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  assignee?: string;
  relatedContentIds: string[];
}

// Tag types
export interface Tag {
  id: string;
  name: string;
  color: string;
}

// Source types
export interface Source extends BaseEntity {
  name: string;
  type: string;
  config: Record<string, any>;
}

// Graph types
export interface GraphNode {
  id: string;
  type: 'content' | 'task';
  title: string;
  tags: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

// Hero Icon type
import { ComponentType, SVGProps } from 'react';
export type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;