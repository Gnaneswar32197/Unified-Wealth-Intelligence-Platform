import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Users, ShieldCheck } from 'lucide-react';

export default function Sessions() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/security/sessions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.active_sessions || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  return (
    <PageTemplate
      title="Active User Sessions"
      subtitle="Examine currently active system sessions, operator permissions, and verify session states."
      details={[
        'Identify active user accounts currently operating on backend nodes',
        'Verify employee codes and roles against internal directory registries',
        'Inspect session logs to prevent double-login exceptions',
        'Revoke or lock down inactive user sessions dynamically'
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
              <Users size={15} className="text-indigo-400" />
              Active Operator Directory
            </h3>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
              {data.length} Sessions Active
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">User ID</th>
                  <th className="p-4">Employee Code</th>
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-mono text-gray-500">#{item.id}</td>
                    <td className="p-4 font-mono text-gray-300 font-bold">{item.employee_code || 'EMP_000'}</td>
                    <td className="p-4 font-semibold text-gray-200">{item.full_name}</td>
                    <td className="p-4 text-gray-450 font-mono">{item.email}</td>
                    <td className="p-4 text-gray-400 font-semibold">{item.role_name}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-1 w-fit mx-auto">
                        <ShieldCheck size={11} /> ONLINE
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No active sessions found.
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
