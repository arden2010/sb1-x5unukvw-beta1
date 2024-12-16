import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../../store';
import { BrainService } from '../../../services/brain';
import BrainGraph from './BrainGraph';
import BrainLegend from './BrainLegend';

interface Dimensions {
  width: number;
  height: number;
}

export default function BrainContainer() {
  const { contents = [], tasks = [] } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

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
      const data = BrainService.buildGraph(contents, tasks);
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
      console.error('Failed to build brain graph:', error);
      setGraphData({ nodes: [], links: [] });
    }
  }, [contents, tasks]);

  if (!dimensions.width) {
    return <div ref={containerRef} className="w-full h-[600px] bg-white rounded-lg shadow" />;
  }

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow" ref={containerRef}>
      {graphData.nodes.length > 0 ? (
        <>
          <BrainGraph 
            nodes={graphData.nodes}
            links={graphData.links}
            width={dimensions.width}
            height={dimensions.height}
          />
          <BrainLegend />
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          暂无内容关联
        </div>
      )}
    </div>
  );
}