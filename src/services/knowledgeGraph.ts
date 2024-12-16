import { Content, Task } from '../types';

interface Node {
  id: string;
  type: 'content' | 'task';
  title: string;
  tags: string[];
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
}

export class KnowledgeGraphService {
  static buildGraph(contents: Content[] = [], tasks: Task[] = []): Graph {
    try {
      const nodes: Node[] = [
        ...contents.map(content => ({
          id: content.id,
          type: 'content' as const,
          title: content.title || 'Untitled',
          tags: content.tags || []
        })),
        ...tasks.map(task => ({
          id: task.id,
          type: 'task' as const,
          title: task.title || 'Untitled Task',
          tags: []
        }))
      ];

      const edges: Edge[] = [];

      // Only create edges between existing nodes
      const nodeIds = new Set(nodes.map(n => n.id));

      // Connect related content based on tags
      for (let i = 0; i < contents.length; i++) {
        for (let j = i + 1; j < contents.length; j++) {
          const weight = this.calculateRelationWeight(contents[i], contents[j]);
          if (weight > 0) {
            edges.push({
              source: contents[i].id,
              target: contents[j].id,
              weight
            });
          }
        }
      }

      // Connect tasks to related content
      tasks.forEach(task => {
        if (task.relatedContentIds) {
          task.relatedContentIds.forEach(contentId => {
            // Only create edge if both nodes exist
            if (nodeIds.has(task.id) && nodeIds.has(contentId)) {
              edges.push({
                source: task.id,
                target: contentId,
                weight: 1
              });
            }
          });
        }
      });

      return { nodes, edges };
    } catch (error) {
      console.error('Failed to build graph:', error);
      return { nodes: [], edges: [] };
    }
  }

  private static calculateRelationWeight(content1: Content, content2: Content): number {
    let weight = 0;

    // Calculate weight based on shared tags
    const sharedTags = content1.tags?.filter(tag => content2.tags?.includes(tag)) || [];
    weight += sharedTags.length * 2;

    // Calculate weight based on shared keywords if available
    const keywords1 = content1.metadata?.keywords || [];
    const keywords2 = content2.metadata?.keywords || [];
    const sharedKeywords = keywords1.filter(keyword => keywords2.includes(keyword));
    weight += sharedKeywords.length;

    return weight;
  }
}