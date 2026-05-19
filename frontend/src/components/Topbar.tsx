import { useAuth } from '../context.tsx';
import { Bell, UserCheck } from 'lucide-react';

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-gray-200 text-sm tracking-wide uppercase">
          Terminal Status: <span className="text-emerald-400">Online</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-gray-200">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-200">{user?.name || 'Guest'}</p>
            <p className="text-xs text-emerald-400 font-mono uppercase">{user?.role || 'No Role'}</p>
          </div>
          <div className="h-9 w-9 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 text-emerald-400">
            <UserCheck size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}