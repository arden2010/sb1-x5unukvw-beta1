import { Link } from 'react-router-dom';
import { HeroIcon } from '../../../types';

interface StatsCardProps {
  title: string;
  value: number;
  icon: HeroIcon;
  color: string;
  to?: string;
}

export default function StatsCard({ title, value, icon: Icon, color, to }: StatsCardProps) {
  const Card = ({ children }: { children: React.ReactNode }) => {
    const className = `bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow ${to ? 'cursor-pointer' : ''}`;
    return to ? (
      <Link to={to} className={className}>
        {children}
      </Link>
    ) : (
      <div className={className}>{children}</div>
    );
  };

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">
                {value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </Card>
  );
}