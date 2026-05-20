import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { PieChart } from 'lucide-react';

export default function Diversification() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiversification() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/advisor/diversification', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.diversification_analysis || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiversification();
  }, []);

  return (
    <PageTemplate
      title="Portfolio Diversification analysis"
      subtitle="Examine asset-class allocations and detect concentration risks dynamically across client accounts."
      details={[
        'Review allocation ratios between equity and mutual fund classes',
        'Detect single-name asset concentration values exceeding compliance ceilings',
        'Verify overall book balancing metrics against model portfolio weights',
        'Analyze historical rebalancing logs to ensure optimal risk mitigation'
      ]}
    >
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl mt-8">
          <div className="p-5 border-b border-gray-800 bg-gray-950/40">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <PieChart size={15} className="text-emerald-400" />
              Diversification Ledger
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Investor Name</th>
                  <th className="p-4">Equity Ratio</th>
                  <th className="p-4">Mutual Fund Ratio</th>
                  <th className="p-4 text-center">Diversification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">{item.investor_name}</td>
                    <td className="p-4 font-mono text-gray-400">{item.equity_percentage}%</td>
                    <td className="p-4 font-mono text-gray-400">{item.mutual_fund_percentage}%</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider border ${
                          item.diversification_score === 'GOOD'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {item.diversification_score}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No active diversification records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
