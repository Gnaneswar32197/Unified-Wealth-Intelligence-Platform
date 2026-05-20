import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Activity } from 'lucide-react';

export default function ActivityLogs() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivityLogs() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/compliance/activity-logs', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setData(data.activity_logs || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivityLogs();
  }, []);

  return (
    <PageTemplate
      title="User Activity Logs"
      subtitle="Track active user operations, critical data modifications, and privilege escalations."
      details={[
        'Monitor operator actions to prevent unauthorized system overrides',
        'Verify change logs for sensitive entries such as role creation or deletion',
        'Analyze system event history to detect compliance exceptions',
        'Establish reliable audit footprints to satisfy data integrity laws'
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
              <Activity size={15} className="text-indigo-400" />
              Operator Activity Audits
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Event ID</th>
                  <th className="p-4">Operator Link</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">API Route</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-mono text-gray-500">#{item.id}</td>
                    <td className="p-4 font-mono text-gray-300">USER_{item.user_id}</td>
                    <td className="p-4 font-semibold text-emerald-400 font-mono">{item.action_type}</td>
                    <td className="p-4 text-gray-300">{item.description}</td>
                    <td className="p-4 text-gray-400 font-mono">{item.endpoint}</td>
                    <td className="p-4 text-gray-400 font-mono">{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No audited activity logs found.
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
