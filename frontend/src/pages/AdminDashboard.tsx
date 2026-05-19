import DashboardCard from '../components/DashboardCard';
import { Cpu, Server, Users, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-amber-500 pl-4">
        <h2 className="text-2xl font-bold tracking-tight">Root Administration Environment</h2>
        <p className="text-sm text-amber-500 font-mono">AUTHORIZED SYSTEM ADMINS ONLY — SECURITY PROTOCOL ACTIVE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard title="System Node Load" value="22.4%" icon={Cpu} />
        <DashboardCard title="API Microservices" value="48 / 48 Up" icon={Server} />
        <DashboardCard title="Active Client Shells" value="1,842" icon={Users} />
        <DashboardCard title="Core Engine Sync" value="99.999%" icon={RefreshCw} />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">System Log Firehose</h3>
        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-400 space-y-2">
          <p><span className="text-blue-400">[00:42:11 UTC]</span> INF - Database connection engine pool healthy. 128 connections idle.</p>
          <p><span className="text-emerald-400">[00:43:02 UTC]</span> OK - Compliance audit block routine validated for block #92810.</p>
          <p><span className="text-amber-400">[00:44:50 UTC]</span> WARN - API latency variance spiked to 142ms on Equity quotes resolver.</p>
        </div>
      </div>
    </div>
  );
}