import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import DashboardCard from '../components/DashboardCard';
import { Landmark, PieChart, BarChart3 } from 'lucide-react';

export default function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/advisor/analytics', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setAnalytics(data.analytics);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  return (
    <PageTemplate
      title="Advisor Asset Analytics"
      subtitle="Institutional investment intelligence and cross-service portfolio capital distributions."
      details={[
        'Analyze aggregated capital distributions across the entire firm book',
        'Verify target asset allocation ratios between Equity and Mutual Funds',
        'Track asset flow metrics and evaluate active advisory volume',
        'Optimize model portfolios based on consolidated platform analytics'
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
              title="Aggregated Firm Assets"
              value={`$${analytics?.total_wealth?.toLocaleString() || '0'}`}
              icon={Landmark}
              subtext="Consolidated platform wealth"
            />
            <td className="hidden"></td>
            <DashboardCard
              title="Equity Holdings Allocation"
              value={`$${analytics?.total_equity_value?.toLocaleString() || '0'}`}
              icon={BarChart3}
              subtext={`Ratio: ${analytics?.diversification_ratio?.equity_percentage || '0'}%`}
            />
            <DashboardCard
              title="Mutual Fund Allocations"
              value={`$${analytics?.total_mutual_fund_value?.toLocaleString() || '0'}`}
              icon={PieChart}
              subtext={`Ratio: ${analytics?.diversification_ratio?.mutual_fund_percentage || '0'}%`}
            />
          </div>

          {/* Allocation visualization block */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono mb-6">
              Consolidated Asset Mix Ratio
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>EQUITY DESK ({analytics?.diversification_ratio?.equity_percentage || '0'}%)</span>
                  <span>MUTUAL FUNDS ({analytics?.diversification_ratio?.mutual_fund_percentage || '0'}%)</span>
                </div>
                <div className="w-full bg-gray-950 rounded-full h-3 overflow-hidden flex border border-gray-850">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${analytics?.diversification_ratio?.equity_percentage || 50}%` }}
                  ></div>
                  <div
                    className="bg-indigo-500 h-full transition-all duration-500"
                    style={{ width: `${analytics?.diversification_ratio?.mutual_fund_percentage || 50}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-850">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>
                  <div>
                    <p className="text-xs font-semibold text-gray-200">Direct Equity Assets</p>
                    <p className="text-[10px] text-gray-500 font-mono">${analytics?.total_equity_value?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
                  <div>
                    <p className="text-xs font-semibold text-gray-200">Pooled Mutual Funds</p>
                    <p className="text-[10px] text-gray-500 font-mono">${analytics?.total_mutual_fund_value?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
