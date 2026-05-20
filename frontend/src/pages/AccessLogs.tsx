import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { FileSearch } from 'lucide-react';

export default function AccessLogs() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccessLogs() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/compliance/access-logs', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.access_logs || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAccessLogs();
  }, []);

  return (
    <PageTemplate
      title="User Access Logs"
      subtitle="Audit real-time system connection requests, endpoint traces, and source network coordinates."
      details={[
        'Trace active token connections across gateway routers and API endpoints',
        'Verify caller IP addresses and block unauthorized subnet ranges',
        'Audit access log footprints to meet regulatory requirements',
        'Maintain system security standards by reviewing gateway requests'
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
              <FileSearch size={15} className="text-emerald-400" />
              Caller Access Audits
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Access ID</th>
                  <th className="p-4">User Link ID</th>
                  <th className="p-4">Requested Endpoint</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Access Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-mono text-gray-500">#{item.id}</td>
                    <td className="p-4 font-mono text-gray-300">USER_{item.user_id} (Role: {item.role_id})</td>
                    <td className="p-4 text-gray-400 font-mono">{item.endpoint}</td>
                    <td className="p-4 font-mono uppercase font-semibold text-emerald-400">{item.request_method || 'GET'}</td>
                    <td className="p-4 font-mono text-gray-450">{item.ip_address || '127.0.0.1'}</td>
                    <td className="p-4 text-gray-400 font-mono">{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No audited access logs found.
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
