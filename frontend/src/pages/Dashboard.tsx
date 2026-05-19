import { useState, useEffect } from 'react';
import { useAuth } from '../context.tsx';
import { Navigate, Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { Wallet, ShieldCheck, PieChart, Activity, ExternalLink } from 'lucide-react';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auto-redirect specific roles to their dedicated workspaces
  if (user && !['Admin', 'SuperAdmin'].includes(user.role)) {
    if (user.role === 'RM') return <Navigate to="/dashboard/rm" replace />;
    if (user.role === 'Advisory') return <Navigate to="/dashboard/advisory" replace />;
    if (user.role === 'Operations') return <Navigate to="/dashboard/operations" replace />;
    if (user.role === 'Compliance') return <Navigate to="/dashboard/compliance" replace />;
    if (user.role === 'Security') return <Navigate to="/dashboard/security" replace />;
  }

  useEffect(() => {
    async function fetchPlatformStats() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/rm/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.dashboard);
        }
      } catch (err) {
        console.error("Failed to fetch consolidated metrics, using fallback:", err);
        // Fallback stats
        setStats({
          total_investors: 3,
          total_platform_users: 6,
          recent_activity: []
        });
      } finally {
        setLoading(false);
      }
    }
    fetchPlatformStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Main Consolidated Overview</h2>
          <p className="text-sm text-gray-400">Total cross-asset analytics aggregation system</p>
        </div>
        <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-xs font-mono text-gray-400 flex items-center gap-2">
          Platform Status: <span className="text-emerald-400 font-bold">ONLINE</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <DashboardCard 
          title="Consolidated Investors" 
          value={loading ? "..." : `${stats?.total_investors || 0} Registered`} 
          icon={Wallet} 
          subtext="Total unified client portfolios" 
        />
        <DashboardCard 
          title="Platform Operators" 
          value={loading ? "..." : `${stats?.total_platform_users || 0} Accounts`} 
          icon={PieChart} 
          subtext="Active staff logins & roles" 
        />
        <DashboardCard 
          title="System Risk Index" 
          value="Low Risk (0.22)" 
          change="Stable" 
          isPositive={true} 
          icon={ShieldCheck} 
          subtext="Dynamic compliance vector score" 
        />
        <DashboardCard 
          title="Live API Gateway Nodes" 
          value="3 Online" 
          change="100%" 
          isPositive={true} 
          icon={Activity} 
          subtext="Main-Server, Equity, Mutual Fund" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { title: 'Equity Markets Portfolio', desc: 'Direct market feeds, order execution blocks, and single-name equity models.', link: '/dashboard/equity' },
          { title: 'Mutual Funds & Pools', desc: 'Sovereign wealth pools, dynamic systematic transfer strategies, and NAV valuations.', link: '/dashboard/mutual-funds' },
          { title: 'Real Estate Ledger', desc: 'Direct real asset custody, yield metrics, mortgage configurations, and appraisal logs.', link: '/dashboard/real-estate' },
        ].map((block, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between crypto-glow-card">
            <div>
              <h4 className="font-bold text-gray-200 mb-2">{block.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{block.desc}</p>
            </div>
            <Link to={block.link} className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider">
              Inspect Asset Block <ExternalLink size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}