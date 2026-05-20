import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { ShieldAlert } from 'lucide-react';

export default function RiskAnalysis() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRisk() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/advisor/risk-analysis', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.risk_analysis || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRisk();
  }, []);

  return (
    <PageTemplate
      title="Advisor Risk Analysis"
      subtitle="Examine single-name exposures and risk vector levels across consolidated platform accounts."
      details={[
        'Evaluate market risk multipliers based on equity-vs-fund exposure weights',
        'Flag high volatility equity holdings exceeding standard asset mandates',
        'Review risk indexes and track deviation limits against compliance models',
        'Assess concentration limits and lock down high-risk portfolios'
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
              <ShieldAlert size={15} className="text-rose-400" />
              Risk Index Ledger
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Investor Name</th>
                  <th className="p-4 text-right">Net Assets</th>
                  <th className="p-4 text-right">Equity Value</th>
                  <th className="p-4 text-right">Mutual Fund Value</th>
                  <th className="p-4 text-center">Risk Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">{item.investor_name}</td>
                    <td className="p-4 text-right text-gray-400 font-mono">${item.total_wealth?.toLocaleString()}</td>
                    <td className="p-4 text-right text-gray-400 font-mono">${item.equity_exposure?.toLocaleString()}</td>
                    <td className="p-4 text-right text-gray-400 font-mono">${item.mutual_fund_exposure?.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider border ${
                          item.risk_category === 'HIGH'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : item.risk_category === 'MODERATE'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {item.risk_category} RISK
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No active risk records found.
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
