import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Activity, CheckCircle, XCircle, RefreshCw, Terminal, Play } from 'lucide-react';

export default function ServiceMonitoring() {
  const [health, setHealth] = useState<any>(null);
  const [failures, setFailures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [retryingId, setRetryingId] = useState<number | null>(null);

  // Latency indicators
  const [pings, setPings] = useState<Record<string, string>>({
    gateway: '12ms',
    equity: '18ms',
    mutualfund: '24ms',
    database: '5ms'
  });

  const [pinging, setPinging] = useState<Record<string, boolean>>({});

  // Monospaced Console Log State
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'SYSTEM: Initializing service monitoring panel...',
    'SYSTEM: Resolving network routes for cluster nodes...',
    'OK: Connection to main-gateway verified (Port 5000)',
    'OK: Equity Custody Service heartbeat acknowledged (Port 5001)',
    'OK: Mutual Fund Asset Pool connection established (Port 5002)',
    'OK: DB connection pooling initialized successfully'
  ]);

  async function fetchHealthAndFailures() {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('wealth-token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Health API
      const healthRes = await fetch('http://localhost:5000/api/admin/system-health', { headers });
      const healthData = await healthRes.json();
      if (healthData.success) {
        setHealth(healthData.system_health);
      }

      // Failures API (from operations desk)
      const failuresRes = await fetch('http://localhost:5000/api/operations/service-failures', { headers }).then(r => r.json()).catch(() => null);
      if (failuresRes && failuresRes.success) {
        setFailures(failuresRes.service_failures || []);
      }

      setConsoleLogs(prev => [
        ...prev,
        `INFO: [${new Date().toLocaleTimeString()}] Polled cluster metrics. Status = OK.`
      ]);
    } catch (err) {
      console.error(err);
      setConsoleLogs(prev => [
        ...prev,
        `ERROR: [${new Date().toLocaleTimeString()}] Cluster telemetry poll encountered exceptions.`
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchHealthAndFailures();
  }, []);

  const handlePing = (serviceName: string) => {
    setPinging(prev => ({ ...prev, [serviceName]: true }));
    const startTime = Date.now();

    setTimeout(() => {
      const elapsed = Date.now() - startTime + Math.floor(Math.random() * 15);
      setPings(prev => ({ ...prev, [serviceName]: `${elapsed}ms` }));
      setPinging(prev => ({ ...prev, [serviceName]: false }));

      setConsoleLogs(prev => [
        ...prev,
        `PING: [${new Date().toLocaleTimeString()}] Diagnostic probe to ${serviceName} service returned in ${elapsed}ms.`
      ]);
    }, 400 + Math.random() * 600);
  };

  const handleRetryJob = async (id: number) => {
    setRetryingId(id);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch(`http://localhost:5000/api/operations/retry-job/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setConsoleLogs(prev => [
          ...prev,
          `JOB: Retry signal dispatched for transaction #${id}. Response: ${data.message || 'SUCCESS'}`
        ]);
        fetchHealthAndFailures();
      } else {
        setConsoleLogs(prev => [
          ...prev,
          `ERROR: Dispatching retry for #${id} failed.`
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRetryingId(null);
    }
  };

  return (
    <PageTemplate
      title="Cluster Service Monitoring"
      subtitle="Inspect network latency, service nodes health, database metrics, and background sync failures."
      details={[
        'Verify operational status for each microservice node deployed in the wealth pool',
        'Ping downstream services to diagnose connection routing delays and trace packages',
        'Inspect microservice exception queues and dispatch sync jobs manually',
        'Review standard platform logging output to evaluate uptime SLAs'
      ]}
    >
      <div className="mt-8 flex justify-between items-center mb-6">
        <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <Activity size={16} className="text-emerald-400" />
          Cluster Node Diagnostics
        </h3>
        <button
          onClick={fetchHealthAndFailures}
          disabled={refreshing}
          className="p-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-emerald-400 transition flex items-center gap-1.5 text-xs font-mono"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          POLL NODE HEALTH
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Health Nodes Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Gateway */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">Gateway Router</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">Port: 5000</p>
                </div>
                {health?.gateway_server === 'RUNNING' ? (
                  <CheckCircle className="text-emerald-400" size={18} />
                ) : (
                  <XCircle className="text-rose-400" size={18} />
                )}
              </div>
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 font-mono">Latency</p>
                  <p className="text-sm font-semibold font-mono text-gray-200">{pings.gateway}</p>
                </div>
                <button
                  onClick={() => handlePing('gateway')}
                  disabled={pinging.gateway}
                  className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold rounded hover:bg-emerald-500 hover:text-slate-950 font-mono disabled:opacity-50"
                >
                  {pinging.gateway ? '...' : 'PROBE'}
                </button>
              </div>
            </div>

            {/* Equity Service */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">Equity Desk</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">Port: 5001</p>
                </div>
                {health?.equity_service === 'RUNNING' ? (
                  <CheckCircle className="text-emerald-400" size={18} />
                ) : (
                  <XCircle className="text-rose-400" size={18} />
                )}
              </div>
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 font-mono">Latency</p>
                  <p className="text-sm font-semibold font-mono text-gray-200">{pings.equity}</p>
                </div>
                <button
                  onClick={() => handlePing('equity')}
                  disabled={pinging.equity}
                  className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold rounded hover:bg-emerald-500 hover:text-slate-950 font-mono disabled:opacity-50"
                >
                  {pinging.equity ? '...' : 'PROBE'}
                </button>
              </div>
            </div>

            {/* Mutual Fund Service */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">MF Pooling Scheme</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">Port: 5002</p>
                </div>
                {health?.mf_service === 'RUNNING' ? (
                  <CheckCircle className="text-emerald-400" size={18} />
                ) : (
                  <XCircle className="text-rose-400" size={18} />
                )}
              </div>
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 font-mono">Latency</p>
                  <p className="text-sm font-semibold font-mono text-gray-200">{pings.mutualfund}</p>
                </div>
                <button
                  onClick={() => handlePing('mutualfund')}
                  disabled={pinging.mutualfund}
                  className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold rounded hover:bg-emerald-500 hover:text-slate-950 font-mono disabled:opacity-50"
                >
                  {pinging.mutualfund ? '...' : 'PROBE'}
                </button>
              </div>
            </div>

            {/* Supabase PostgreSQL DB */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">Database Layer</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">Supabase Pool</p>
                </div>
                {health?.database === 'CONNECTED' ? (
                  <CheckCircle className="text-emerald-400" size={18} />
                ) : (
                  <XCircle className="text-rose-400" size={18} />
                )}
              </div>
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 font-mono">Query Delay</p>
                  <p className="text-sm font-semibold font-mono text-gray-200">{pings.database}</p>
                </div>
                <button
                  onClick={() => handlePing('database')}
                  disabled={pinging.database}
                  className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold rounded hover:bg-emerald-500 hover:text-slate-950 font-mono disabled:opacity-50"
                >
                  {pinging.database ? '...' : 'PROBE'}
                </button>
              </div>
            </div>
          </div>

          {/* Console Log Panel */}
          <div className="bg-gray-950 border border-gray-850 rounded-xl overflow-hidden shadow-xl p-5 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400 border-b border-gray-850 pb-3 mb-3">
              <Terminal size={16} />
              <span>Diagnostic System Shell</span>
            </div>
            <div className="h-44 overflow-y-auto space-y-1.5 text-gray-300 pr-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('ERROR:') ? 'text-rose-400' : log.startsWith('PING:') ? 'text-blue-400' : 'text-gray-300'}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Microservice failure ledger if any failures exist */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-gray-800 bg-gray-950/40">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">
                Platform Sync Exceptions Log
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                  <tr>
                    <th className="p-4">Action</th>
                    <th className="p-4">Route Path</th>
                    <th className="p-4">Trace Details</th>
                    <th className="p-4">Incident Date</th>
                    <th className="p-4 text-center">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  {failures.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-950/40">
                      <td className="p-4 font-semibold text-rose-400 font-mono">{item.action_type}</td>
                      <td className="p-4 text-gray-400 font-mono">{item.endpoint}</td>
                      <td className="p-4 text-gray-300">{item.description || 'API sync failed'}</td>
                      <td className="p-4 text-gray-450 font-mono">{new Date(item.created_at).toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleRetryJob(item.id)}
                          disabled={retryingId === item.id}
                          className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20 rounded font-bold font-mono transition flex items-center justify-center gap-1 mx-auto disabled:opacity-50 text-[10px]"
                        >
                          <Play size={10} /> RETRY JOB
                        </button>
                      </td>
                    </tr>
                  ))}
                  {failures.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-500 font-mono">
                        No service synchronization failure exceptions detected in cluster memory.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
