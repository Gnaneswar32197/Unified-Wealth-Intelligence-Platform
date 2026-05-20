import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function FailedAttempts() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFailedAttempts() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/security/failed-attempts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.failed_attempts || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFailedAttempts();
  }, []);

  return (
    <PageTemplate
      title="Failed Login Attempts"
      subtitle="Investigate failed authentication requests, source IPs, and trace security audit entries."
      details={[
        'Trace failed login footprints to block malicious brute-force attempts',
        'Verify request descriptions to identify password mismatches or unknown usernames',
        'Analyze audit records to confirm correct security policy reinforcement',
        'Audit source network coordinates and export incident logs to compliance desks'
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
              <ShieldAlert size={15} className="text-rose-400" />
              Failed Authentication Audits
            </h3>
            <span className="text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <AlertTriangle size={12} /> {data.length} Security Alerts
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Incident ID</th>
                  <th className="p-4">Target User ID</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Incident Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-mono text-gray-500">#{item.id}</td>
                    <td className="p-4 font-mono text-gray-300">USER_{item.user_id || 'UNKNOWN'}</td>
                    <td className="p-4 text-gray-300">{item.description}</td>
                    <td className="p-4 font-mono text-rose-400">{item.ip_address || '127.0.0.1'}</td>
                    <td className="p-4 text-gray-450 font-mono">{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No failed authentication events recorded.
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
