import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { GraphNode } from '../../../types';

interface BrainGraphProps {
  nodes: GraphNode[];
  links: any[];
  width: number;
  height: number;
  onNodeClick?: (node: GraphNode) => void;
}

export default function BrainGraph({ 
  nodes, 
  links, 
  width, 
  height,
  onNodeClick 
}: BrainGraphProps) {
  const graphRef = useRef<any>(null);

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={{ nodes, links }}
      nodeLabel={(node: GraphNode) => node.title}
      nodeColor={(node: GraphNode) => node.type === 'content' ? '#3B82F6' : '#10B981'}
      linkWidth={1}
      linkColor={() => '#CBD5E1'}
      width={width}
      height={height}
      cooldownTicks={100}
      onNodeClick={(node: GraphNode) => {
        if (onNodeClick) {
          onNodeClick(node);
        } else if (graphRef.current) {
          const { x, y } = node as any;
          graphRef.current.centerAt(x, y, 1000);
          graphRef.current.zoom(2, 1000);
        }
      }}
    />
  );
}