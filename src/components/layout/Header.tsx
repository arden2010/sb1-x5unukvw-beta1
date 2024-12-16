import SearchBar from '../search/SearchBar';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-600">ICTM</h1>
      </div>
      <div className="flex-1 max-w-3xl mx-4">
        <SearchBar />
      </div>
      <div className="text-gray-600">
        已开启自动获取
      </div>
    </header>
  );
}