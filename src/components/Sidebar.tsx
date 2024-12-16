import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  HomeIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  TagIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Contents', href: '/contents', icon: DocumentTextIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Tags', href: '/tags', icon: TagIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`relative flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Toggle button - Moved to middle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-gray-200 rounded-full p-1 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 z-10 shadow-lg"
        title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-4 w-4" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4" />
        )}
      </button>

      {/* Header */}
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
        <h1 className={`text-xl font-bold text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          ICTMS
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              />
              <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}