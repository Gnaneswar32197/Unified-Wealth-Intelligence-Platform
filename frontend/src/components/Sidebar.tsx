import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context.tsx';
import {
  LayoutDashboard,
  Users,
  Activity,
  Building,
  HeartPulse,
  ServerCog,
  Bell,
  FileSearch,
  UserPlus,
  Settings2,
  KeyRound,
  ShieldCheck,
  BarChart3,
  Database,
  LogOut,
} from 'lucide-react';

const makeLinkClass = (currentPath: string, path: string) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
    currentPath === path ? 'bg-emerald-600/10 text-emerald-400' : 'text-slate-400 hover:text-emerald-300'
  }`;

export default function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const currentPath = location.pathname;

  const mainLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const superAdminLinks = [
    { to: '/dashboard/investors', label: 'Investors', icon: Users },
    { to: '/dashboard/sip-monitoring', label: 'SIP Monitoring', icon: Activity },
    { to: '/dashboard/real-estate', label: 'Real Estate', icon: Building },
    { to: '/dashboard/service-health', label: 'Service Health', icon: HeartPulse },
    { to: '/dashboard/api-monitoring', label: 'API Monitoring', icon: ServerCog },
    { to: '/dashboard/alerts', label: 'Alerts', icon: Bell },
    { to: '/dashboard/audit-logs', label: 'Audit Logs', icon: FileSearch },
    { to: '/dashboard/users', label: 'Users', icon: UserPlus },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings2 },
  ];

  const superAdminTools = [
    { to: '/dashboard/user-management', label: 'User Management', icon: Users },
    { to: '/dashboard/role-management', label: 'Role Management', icon: KeyRound },
    { to: '/dashboard/service-monitoring', label: 'Service Monitoring', icon: Database },
    { to: '/dashboard/api-governance', label: 'API Governance', icon: ShieldCheck },
    { to: '/dashboard/system-analytics', label: 'System Analytics', icon: BarChart3 },
  ];

  const adminLinks = [
    { to: '/dashboard/admin', label: 'Admin Dashboard', icon: ShieldCheck },
  ];

  return (
    <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col justify-between h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">W</div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Super Admin</p>
            <p className="text-xs text-slate-500">Platform controller</p>
          </div>
        </div>

        <nav className="space-y-1">
          {mainLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}

          {adminLinks.map((item) => {
            if (!['Admin', 'SuperAdmin'].includes(user?.role || '')) return null;
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}

          {/* Operational Roles Section */}
          {['RM', 'Advisory', 'Operations', 'Compliance', 'Security', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
            <>
              <div className="mt-6 mb-2 px-4 text-xs uppercase tracking-[0.28em] text-slate-500">Operational Desks</div>
              {['RM', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/rm" className={makeLinkClass(currentPath, '/dashboard/rm')}>
                  <Users size={18} />
                  RM Client Book
                </Link>
              )}
              {['Advisory', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/advisory" className={makeLinkClass(currentPath, '/dashboard/advisory')}>
                  <BarChart3 size={18} />
                  Advisory Panel
                </Link>
              )}
              {['Operations', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/operations" className={makeLinkClass(currentPath, '/dashboard/operations')}>
                  <ServerCog size={18} />
                  Operations Desk
                </Link>
              )}
              {['Compliance', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/compliance" className={makeLinkClass(currentPath, '/dashboard/compliance')}>
                  <FileSearch size={18} />
                  Compliance Reports
                </Link>
              )}
              {['Security', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/security" className={makeLinkClass(currentPath, '/dashboard/security')}>
                  <ShieldCheck size={18} />
                  Security Center
                </Link>
              )}
            </>
          )}

          {user?.role === 'SuperAdmin' && (
            <>
              <div className="mt-6 mb-2 px-4 text-xs uppercase tracking-[0.28em] text-slate-500">Super Admin Controls</div>
              {superAdminLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-6 mb-2 px-4 text-xs uppercase tracking-[0.28em] text-slate-500">Platform Operations</div>
              {superAdminTools.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          <LogOut size={18} />
          Terminate Session
        </button>
      </div>
    </aside>
  );
}