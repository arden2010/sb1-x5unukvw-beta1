import { Link } from 'react-router-dom';
import { HeroIcon } from '../../types';

interface StatsCardProps {
  title: string;
  value: number;
  icon: HeroIcon;
  color: string;
  to?: string;
}

export default function StatsCard({ title, value, icon: Icon, color, to }: StatsCardProps) {
  const CardContent = (
    <div className="p-5 group">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate group-hover:text-gray-700 transition-colors">
              {title}
            </dt>
            <dd className="text-lg font-medium text-gray-900">
              {value}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link 
        to={to}
        className={`
          block bg-white overflow-hidden shadow rounded-lg 
          hover:shadow-md hover:bg-gray-50 transition-all duration-200 
          cursor-pointer
        `}
        title={`查看${title}`}
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      {CardContent}
    </div>
  );
}