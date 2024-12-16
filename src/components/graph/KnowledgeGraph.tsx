import { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useStore } from '../../store';
import { KnowledgeGraphService } from '../../services/knowledgeGraph';
import { GraphNode, GraphEdge } from '../../types';

interface GraphData {
  nodes: GraphNode[];
  links: GraphEdge[];
}

export default function KnowledgeGraph() {
  const { contents = [], tasks = [] } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: containerRef.current?.clientWidth || 0,
          height: 600
        });
      };

      updateDimensions();
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);
      
      return () => resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    try {
      const data = KnowledgeGraphService.buildGraph(contents, tasks);
      const validNodes = data.nodes.filter(node => node.id && typeof node.id === 'string');
      const validEdges = data.edges.filter(edge => 
        edge.source && edge.target &&
        validNodes.some(n => n.id === edge.source) &&
        validNodes.some(n => n.id === edge.target)
      );

      setGraphData({
        nodes: validNodes,
        links: validEdges
      });
    } catch (error) {
      console.error('Failed to build graph:', error);
      setGraphData({ nodes: [], links: [] });
    }
  }, [contents, tasks]);

  if (!dimensions.width) {
    return <div ref={containerRef} className="w-full h-[600px] bg-white rounded-lg shadow" />;
  }

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow" ref={containerRef}>
      {graphData.nodes.length > 0 ? (
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel={(node: GraphNode) => node.title}
          nodeColor={(node: GraphNode) => node.type === 'content' ? '#3B82F6' : '#10B981'}
          linkWidth={1}
          linkColor={() => '#CBD5E1'}
          width={dimensions.width}
          height={dimensions.height}
          cooldownTicks={100}
          onNodeClick={(node: GraphNode) => {
            if (graphRef.current) {
              const { x, y } = node as any;
              graphRef.current.centerAt(x, y, 1000);
              graphRef.current.zoom(2, 1000);
            }
          }}
        />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          暂无内容关系图谱
        </div>
      )}
    </div>
  );
}