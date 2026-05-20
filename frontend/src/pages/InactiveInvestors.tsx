import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Users, Mail, AlertTriangle } from 'lucide-react';

export default function InactiveInvestors() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInactive() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/operations/inactive-investors', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.inactive_investors || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchInactive();
  }, []);

  return (
    <PageTemplate
      title="Inactive Investor Accounts"
      subtitle="Audit client profiles with zero log records or transaction activities within the compliance window."
      details={[
        'Detect investor profiles lacking active transaction logs',
        'Verify PAN status and clean stale records from memory cache',
        'Flag profiles for relationship manager follow-ups',
        'Audit zero-balance custody accounts across service gateways'
      ]}
    >
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl mt-8">
          <div className="p-5 border-b border-gray-800 bg-gray-950/40 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Users size={15} className="text-amber-400" />
              Inactive Accounts Ledger
            </h3>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
              {data.length} Accounts Flagged
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Investor Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">PAN Number</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">{item.full_name}</td>
                    <td className="p-4 text-gray-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <Mail size={12} className="text-gray-500" /> {item.email || 'N/A'}
                    </td>
                    <td className="p-4 text-gray-400 font-mono">{item.pan_number}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center gap-1 w-fit mx-auto">
                        <AlertTriangle size={11} /> STALE_FLOW
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No inactive investor accounts found.
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
