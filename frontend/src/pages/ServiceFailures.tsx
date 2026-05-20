import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { ServerCog, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ServiceFailures() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [retryingId, setRetryingId] = useState<number | null>(null);

  async function fetchFailures() {
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/operations/service-failures', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setData(data.service_failures || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFailures();
  }, []);

  const handleRetry = async (id: number) => {
    setRetryingId(id);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch(`http://localhost:5000/api/operations/retry-job/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await res.json();
      if (resData.success) {
        alert(resData.message || 'Retry process dispatched successfully');
        fetchFailures();
      } else {
        alert(resData.message || 'Failed to dispatch retry');
      }
    } catch (err) {
      console.error(err);
      alert('Network connection error during retry dispatch');
    } finally {
      setRetryingId(null);
    }
  };

  return (
    <PageTemplate
      title="Service Failures & Jobs"
      subtitle="Audit failed background microservice actions, log records, and trigger system job retries."
      details={[
        'Identify database transaction failures and microservice connection timeout errors',
        'Inspect audit trace logs to discover exact routing exception scopes',
        'Trigger background thread job retries dynamically via secure API channels',
        'Review audit log records to satisfy compliance standards and service SLAs'
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
              <ServerCog size={15} className="text-rose-400" />
              Failed System Transactions
            </h3>
            <button
              onClick={() => { setLoading(true); fetchFailures(); }}
              className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-gray-200 rounded-lg transition"
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Action Type</th>
                  <th className="p-4">Route Path</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Created Time</th>
                  <th className="p-4 text-center">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-rose-400 font-mono">{item.action_type}</td>
                    <td className="p-4 text-gray-400 font-mono">{item.endpoint}</td>
                    <td className="p-4 text-gray-300">{item.description || 'Connection timed out'}</td>
                    <td className="p-4 text-gray-400 font-mono">{new Date(item.created_at).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleRetry(item.id)}
                        disabled={retryingId === item.id}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-lg font-bold font-mono transition flex items-center justify-center gap-1 mx-auto disabled:opacity-50"
                      >
                        <RefreshCw size={12} className={retryingId === item.id ? 'animate-spin' : ''} />
                        RETRY
                      </button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2 py-4">
                        <CheckCircle2 size={24} className="text-emerald-400" />
                        <span className="text-gray-300 font-bold">Zero Failures Detected</span>
                        <span className="text-[10px] text-gray-500 font-mono">All services and background jobs operating within SLA boundaries.</span>
                      </div>
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
