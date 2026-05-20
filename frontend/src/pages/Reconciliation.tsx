import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Database, ShieldCheck, XCircle } from 'lucide-react';

export default function Reconciliation() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecon() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/operations/reconciliation', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.reconciliation || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecon();
  }, []);

  return (
    <PageTemplate
      title="Financial Asset Reconciliation"
      subtitle="Double-entry reconciliation engine. Compare and match gateway custody asset valuations dynamically."
      details={[
        'Verify single investor asset pool allocations between equity and mutual fund services',
        'Audit discrepant balance records and match records to satisfy compliance standards',
        'Review double-entry ledgers to confirm transaction ledger balances',
        'Verify database connectivity records and clean cache repositories dynamically'
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
              <Database size={15} className="text-emerald-400" />
              Cross-Service Asset Balancing Ledger
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Investor Profile</th>
                  <th className="p-4 text-right">Equity Desk Total</th>
                  <th className="p-4 text-right">Mutual Fund Total</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">{item.investor_name}</td>
                    <td className="p-4 text-right text-gray-400 font-mono">${item.equity_total?.toLocaleString() || '0'}</td>
                    <td className="p-4 text-right text-gray-400 font-mono">${item.mutual_fund_total?.toLocaleString() || '0'}</td>
                    <td className="p-4 text-center">
                      {item.reconciliation_status === 'MATCHED' ? (
                        <span className="px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-1 w-fit mx-auto">
                          <ShieldCheck size={11} /> MATCHED
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center gap-1 w-fit mx-auto">
                          <XCircle size={11} /> DISCREPANT
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No active reconciliation ledger records available.
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
