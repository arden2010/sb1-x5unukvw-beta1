export default function BrainLegend() {
  return (
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
  );
}