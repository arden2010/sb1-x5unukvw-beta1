import { Content } from '../../../types';
import { Chart } from 'react-charts';

interface ContentStatsProps {
  contents: Content[];
}

export default function ContentStats({ contents }: ContentStatsProps) {
  // Calculate daily content counts for the last 30 days
  const dailyCounts = React.useMemo(() => {
    const counts = new Map<string, number>();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    contents.forEach(content => {
      const date = new Date(content.createdAt);
      if (date >= thirtyDaysAgo) {
        const dateStr = date.toISOString().split('T')[0];
        counts.set(dateStr, (counts.get(dateStr) || 0) + 1);
      }
    });

    return Array.from(counts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({
        date: new Date(date),
        count
      }));
  }, [contents]);

  const data = React.useMemo(
    () => [
      {
        label: '每日内容数',
        data: dailyCounts
      }
    ],
    [dailyCounts]
  );

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: any) => datum.date,
      formatters: {
        scale: (date: Date) => date.toLocaleDateString()
      }
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum: any) => datum.count,
        elementType: 'bar'
      }
    ],
    []
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">内容趋势</h2>
      <div className="h-64">
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: false
          }}
        />
      </div>
    </div>
  );
}