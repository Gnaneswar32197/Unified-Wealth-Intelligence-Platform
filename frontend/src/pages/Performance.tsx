import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import DashboardCard from '../components/DashboardCard';
import { Landmark, Users, TrendingUp } from 'lucide-react';

export default function Performance() {
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerformance() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/rm/performance', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setPerformance(data.performance);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPerformance();
  }, []);

  return (
    <PageTemplate
      title="Platform performance Ledger"
      subtitle="Operational yield audit desk. Inspect asset values, capital weights, and advisor book balances."
      details={[
        'Analyze cross-asset yield margins across internal equity and MF service routes',
        'Verify custody balance ratios against client allocations dynamically',
        'Track RM assets under management (AUM) and total client book counts',
        'Audit client-level portfolio contributions and compound weight records'
      ]}
    >
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Assets Under Management"
              value={`$${performance?.total_managed_wealth?.toLocaleString() || '0'}`}
              icon={Landmark}
              subtext="Aggregated cross-service balances"
            />
            <DashboardCard
              title="Managed Book Count"
              value={`${performance?.total_investor_count || 0} Investors`}
              icon={Users}
              subtext="Total unique accounts"
            />
            <DashboardCard
              title="Average Book Size"
              value={`$${(
                (performance?.total_managed_wealth || 0) / (performance?.total_investor_count || 1)
              ).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              icon={TrendingUp}
              subtext="Average value per investor"
            />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-gray-800 bg-gray-950/40">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">
                Investor Performance Ledger
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                  <tr>
                    <th className="p-4">Investor Name</th>
                    <th className="p-4 text-right">Equity Exposure</th>
                    <th className="p-4 text-right">Mutual Fund Exposure</th>
                    <th className="p-4 text-right">Total Net Worth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  {performance?.investor_performance?.map((p: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-950/40">
                      <td className="p-4 font-semibold text-gray-200">{p.investor_name}</td>
                      <td className="p-4 text-right text-gray-400 font-mono">${p.equity_value?.toLocaleString()}</td>
                      <td className="p-4 text-right text-gray-400 font-mono">${p.mutual_fund_value?.toLocaleString()}</td>
                      <td className="p-4 text-right text-emerald-400 font-bold font-mono">${p.total_wealth?.toLocaleString()}</td>
                    </tr>
                  ))}
                  {(!performance?.investor_performance || performance.investor_performance.length === 0) && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        No investor records available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
