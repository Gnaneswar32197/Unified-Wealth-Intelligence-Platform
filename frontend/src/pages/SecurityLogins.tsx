import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { KeyRound } from 'lucide-react';

export default function SecurityLogins() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogins() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/security/logins', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.login_activity || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLogins();
  }, []);

  return (
    <PageTemplate
      title="Audit Security Logins"
      subtitle="Examine operator login history, active authentication requests, and verify system log footprints."
      details={[
        'Trace session connections across distinct operator roles and login schedules',
        'Detect login attempts from outside whitelist hours or unauthorized paths',
        'Verify caller security metadata like IP addresses and authentication tokens',
        'Ensure system events satisfy regulatory records and data integrity standards'
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
              <KeyRound size={15} className="text-emerald-450" />
              Audited Login Event Ledger
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Login Audit ID</th>
                  <th className="p-4">Operator Link ID</th>
                  <th className="p-4">Action Type</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-mono text-gray-500">#{item.id}</td>
                    <td className="p-4 font-mono text-gray-300">USER_{item.user_id}</td>
                    <td className="p-4 font-semibold text-gray-200 font-mono">{item.action_type}</td>
                    <td className="p-4 font-mono text-gray-400">{item.ip_address || '127.0.0.1'}</td>
                    <td className="p-4 text-gray-400 font-mono">{new Date(item.created_at).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider border ${
                        item.action_status === 'SUCCESS'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {item.action_status}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No logged login audits found.
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
