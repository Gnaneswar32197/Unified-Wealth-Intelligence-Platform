import { type LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtext?: string;
}

export default function DashboardCard({ title, value, change, isPositive, icon: Icon, subtext }: CardProps) {
  return (
    <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 shadow-xl flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{title}</span>
        <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 text-emerald-400">
          <Icon size={18} />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-gray-100">{value}</h3>
        <div className="flex items-center gap-2 mt-2">
          {change && (
            <span className={`text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{change}
            </span>
          )}
          {subtext && <span className="text-xs text-gray-500">{subtext}</span>}
        </div>
      </div>
    </div>
  );
}