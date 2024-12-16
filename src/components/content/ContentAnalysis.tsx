import { useState, useEffect } from 'react';
import { Content } from '../../types';
import { ContentAnalysisService } from '../../services/ai/contentAnalysis';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store';

interface ContentAnalysisProps {
  contents: Content[];
}

export default function ContentAnalysis({ contents }: ContentAnalysisProps) {
  const { settings } = useStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const analyzeContents = async () => {
      setIsAnalyzing(true);
      try {
        const result = await ContentAnalysisService.analyze(contents);
        setAnalysis(result);
      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeContents();
  }, [contents]);

  if (!analysis) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <SparklesIcon 
          className={`h-5 w-5 ${settings.ai.enabled ? 'text-blue-500' : 'text-gray-500'}`}
        />
        <h2 className="text-lg font-medium">
          {settings.ai.enabled ? 'AI 分析' : '智能分析'}
        </h2>
      </div>

      {isAnalyzing ? (
        <div className="text-gray-500">正在分析内容...</div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">{analysis.summary}</p>
          </div>

          {analysis.keywords.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">关键词</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword: string) => (
                  <span 
                    key={keyword}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analysis.topics.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">主题</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.topics.map((topic: string) => (
                  <span 
                    key={topic}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}