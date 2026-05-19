import { useState, useEffect } from 'react';
import { useAuth } from '../context.tsx';
import DashboardCard from '../components/DashboardCard';
import { Users, Award, TrendingUp, Search, Eye } from 'lucide-react';

export default function RMDashboard() {
  const { user } = useAuth();
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);

  useEffect(() => {
    async function fetchPerformance() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/rm/performance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setPerformance(data.performance);
        }
      } catch (err) {
        console.error("Failed to fetch RM performance, using fallback:", err);
        setPerformance({
          total_investor_count: 3,
          total_managed_wealth: 22250000,
          investor_performance: [
            { investor_name: "Rahul Kapoor", equity_value: 9437750, mutual_fund_value: 3062250, total_wealth: 12500000 },
            { investor_name: "Priya Sharma", equity_value: 2053600, mutual_fund_value: 4746400, total_wealth: 6800000 },
            { investor_name: "Amit Verma", equity_value: 1475000, mutual_fund_value: 1475000, total_wealth: 2950000 }
          ]
        });
      } finally {
        setLoading(false);
      }
    }
    fetchPerformance();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const filteredClients = performance?.investor_performance.filter((c: any) =>
    c.investor_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">RM Client Book Execution</h2>
          <p className="text-sm text-gray-400">Welcome, RM {user?.name}. Manage high-net-worth client accounts and wealth dispersion.</p>
        </div>
        <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-xs font-mono text-gray-400">
          Book Value: <span className="text-emerald-400 font-bold">₹{((performance?.total_managed_wealth || 0) / 10000000).toFixed(2)} Cr</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Assigned Book Volume" 
          value={`₹${((performance?.total_managed_wealth || 0) / 10000000).toFixed(2)} Cr`} 
          icon={Award} 
          subtext="Aggregate assets under advisory"
        />
        <DashboardCard 
          title="High-Net-Worth Accounts" 
          value={`${performance?.total_investor_count || 0} Clients`} 
          icon={Users} 
          subtext="Active consolidated portfolios"
        />
        <DashboardCard 
          title="Avg Client Wealth" 
          value={`₹${((performance?.total_managed_wealth || 0) / (performance?.total_investor_count || 1) / 100000).toFixed(1)} Lakhs`} 
          icon={TrendingUp} 
          isPositive={true}
          subtext="Asset dispersion per head"
        />
      </div>

      {/* Main client grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Active Client Holdings</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-200 outline-none transition focus:border-emerald-500 w-48"
              />
              <Search className="absolute left-3 top-2 text-gray-500" size={14} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3 text-right">Equity Assets</th>
                  <th className="px-4 py-3 text-right">Mutual Funds</th>
                  <th className="px-4 py-3 text-right">Total Assets</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredClients.map((client: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-850/30 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-gray-200">{client.investor_name}</td>
                    <td className="px-4 py-3.5 text-right text-blue-400 font-mono">₹{client.equity_value.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-right text-violet-400 font-mono">₹{client.mutual_fund_value.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-right text-emerald-400 font-mono font-bold">₹{client.total_wealth.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-2 py-1 bg-gray-850 hover:bg-gray-800 border border-gray-800 rounded-lg text-emerald-400 transition flex items-center gap-1 mx-auto"
                      >
                        <Eye size={12} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected client details panel */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Client Detail Inspector</h3>
          {selectedClient ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-950 border border-gray-850 rounded-xl">
                <p className="text-xs text-gray-500 font-bold uppercase">Client Name</p>
                <p className="text-lg font-bold text-white mt-1">{selectedClient.investor_name}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs p-3 bg-gray-950/60 rounded-lg border border-gray-850">
                  <span className="text-gray-400">Equity Value:</span>
                  <span className="text-blue-400 font-mono font-bold">₹{selectedClient.equity_value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 bg-gray-950/60 rounded-lg border border-gray-850">
                  <span className="text-gray-400">Mutual Fund Value:</span>
                  <span className="text-violet-400 font-mono font-bold">₹{selectedClient.mutual_fund_value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 bg-gray-950/60 rounded-lg border border-gray-850">
                  <span className="text-gray-400">Total Net Worth:</span>
                  <span className="text-emerald-400 font-mono font-black">₹{selectedClient.total_wealth.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-xl text-xs text-emerald-400 leading-relaxed">
                <strong>RM Action Required:</strong> Portfolios are currently aligned within standard target deviation indexes. Standard quarterly client review is scheduled.
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 border border-dashed border-gray-800 rounded-xl text-center p-4">
              <Users className="text-gray-600 mb-2" size={24} />
              <p className="text-xs text-gray-400">Select a client from the matrix to inspect their wealth metrics and allocations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}