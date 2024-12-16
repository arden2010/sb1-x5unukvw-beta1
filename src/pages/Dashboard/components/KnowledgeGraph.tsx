import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ForceGraph2D from 'react-force-graph-2d';
import { Content, Task } from '../../../types';
import { useContentViewer } from '../../../hooks/useContentViewer';

interface KnowledgeGraphProps {
  contents: Content[];
  tasks: Task[];
  height?: number;
}

export default function KnowledgeGraph({ contents, tasks, height = 400 }: KnowledgeGraphProps) {
  const navigate = useNavigate();
  const { handleView } = useContentViewer();

  // Prepare graph data
  const graphData = {
    nodes: [
      ...contents.map(c => ({
        id: c.id,
        label: c.title,
        type: 'content',
        data: c
      })),
      ...tasks.map(t => ({
        id: t.id,
        label: t.title,
        type: 'task',
        data: t
      }))
    ],
    links: tasks.flatMap(task => 
      task.relatedContentIds.map(contentId => ({
        source: task.id,
        target: contentId
      }))
    )
  };

  const handleNodeClick = useCallback((node: any) => {
    if (node.type === 'content') {
      handleView(node.data);
    } else {
      navigate('/tasks', { state: { selectedTask: node.data } });
    }
  }, [navigate, handleView]);

  return (
    <div className="relative">
      <ForceGraph2D
        graphData={graphData}
        height={height}
        nodeLabel="label"
        nodeColor={node => node.type === 'content' ? '#3B82F6' : '#10B981'}
        nodeRelSize={6}
        linkColor={() => '#CBD5E1'}
        onNodeClick={handleNodeClick}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = node.type === 'content' ? '#3B82F6' : '#10B981';
          ctx.fillText(label, node.x + 8, node.y + 4);
        }}
      />
      <div className="absolute bottom-4 right-4 flex gap-4 bg-white p-2 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-sm text-gray-600">内容</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-sm text-gray-600">任务</span>
        </div>
      </div>
    </div>
  );
}