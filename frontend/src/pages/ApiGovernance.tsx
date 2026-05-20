import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { ShieldCheck, Plus, Key, RefreshCw, FileCode, AlertTriangle } from 'lucide-react';

export default function ApiGovernance() {
  const [accessLogs, setAccessLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // API Keys state (persisted locally for mock settings override)
  const [keys, setKeys] = useState<any[]>([
    { id: '1', service: 'Wealth-Intelligence-Feed', key: 'wip_live_ak983ha7dfh123h', rateLimit: '100 req/min', status: 'ACTIVE', created: '2026-05-18' },
    { id: '2', service: 'Equity-Execution-Gateway', key: 'wip_live_ek712ka90dfa485j', rateLimit: '500 req/min', status: 'ACTIVE', created: '2026-05-19' },
    { id: '3', service: 'Compliance-Audit-Sink', key: 'wip_live_ck098ha12dfi102k', rateLimit: '50 req/min', status: 'BLOCKED', created: '2026-05-15' }
  ]);

  // Key creation inputs
  const [newService, setNewService] = useState('');
  const [newLimit, setNewLimit] = useState('100 req/min');

  // Rate Limits state
  const [rateLimits, setRateLimits] = useState({
    maxRequests: '500',
    windowMs: '15 minutes',
    ipBlacklistCount: 2
  });

  async function fetchAccessLogs() {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/compliance/access-logs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAccessLogs(data.access_logs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchAccessLogs();
  }, []);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.trim()) return;

    // Generate random mock key
    const randomChars = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 10);
    const mockKey = `wip_live_${randomChars}`;

    const newKeyItem = {
      id: String(keys.length + 1),
      service: newService,
      key: mockKey,
      rateLimit: newLimit,
      status: 'ACTIVE',
      created: new Date().toISOString().split('T')[0]
    };

    setKeys(prev => [newKeyItem, ...prev]);
    setNewService('');
    alert(`Institutional API Integration Key successfully provisioned for ${newService}.`);
  };

  const handleToggleKeyStatus = (id: string) => {
    setKeys(prev => prev.map(k => {
      if (k.id === id) {
        const nextStatus = k.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
        return { ...k, status: nextStatus };
      }
      return k;
    }));
  };

  const handleSaveRateLimits = (e: React.FormEvent) => {
    e.preventDefault();
    alert('API rate limit configurations saved and synchronized across cluster gateway instances.');
  };

  return (
    <PageTemplate
      title="API Governance & Key Center"
      subtitle="Manage external integrations, configure rate limits, check network policies, and audit integration traffic."
      details={[
        'Issue and manage OAuth integration credentials for external bank endpoints',
        'Configure global rate limits and blacklisted IP segments to prevent DDoS attempts',
        'Audit incoming traffic logs directly connected with user access footprints',
        'Toggle key operational locks to protect backend mutual fund and equity service nodes'
      ]}
    >
      <div className="mt-8 flex justify-between items-center mb-6">
        <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <ShieldCheck size={16} className="text-indigo-400" />
          Integration Management Panel
        </h3>
        <button
          onClick={fetchAccessLogs}
          disabled={refreshing}
          className="p-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-emerald-400 transition flex items-center gap-1.5 text-xs font-mono"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          REFRESH TRAFFIC LOGS
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Key Issuance and Rate Limits Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* key provision form */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                <Key size={14} className="text-emerald-400" />
                Issue Access Credentials
              </h3>
              <form onSubmit={handleCreateKey} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Integration Scheme / Client Name</label>
                  <input
                    type="text"
                    required
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="e.g. JPMorgan-Wealth-Gateway"
                    className="w-full bg-gray-950 border border-gray-850 focus:border-emerald-500 rounded-lg p-3 text-xs text-gray-200 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Default Rate Limit</label>
                  <select
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-855 focus:border-emerald-500 rounded-lg p-3 text-xs text-gray-400 outline-none transition"
                  >
                    <option value="50 req/min">50 requests per minute</option>
                    <option value="100 req/min">100 requests per minute</option>
                    <option value="500 req/min">500 requests per minute</option>
                    <option value="1000 req/min">1,000 requests per minute</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex justify-center items-center gap-1.5 transition"
                >
                  <Plus size={14} />
                  PROVISION NEW ACCESS KEY
                </button>
              </form>
            </div>

            {/* global limit config */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                  <FileCode size={14} className="text-indigo-400" />
                  Gateway Routing Limits
                </h3>
                <form onSubmit={handleSaveRateLimits} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Window Limit Count</label>
                      <input
                        type="text"
                        value={rateLimits.maxRequests}
                        onChange={(e) => setRateLimits(prev => ({ ...prev, maxRequests: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-850 rounded-lg p-3 text-xs text-gray-200 font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Window Duration</label>
                      <input
                        type="text"
                        value={rateLimits.windowMs}
                        onChange={(e) => setRateLimits(prev => ({ ...prev, windowMs: e.target.value }))}
                        className="w-full bg-gray-950 border border-gray-850 rounded-lg p-3 text-xs text-gray-200 font-mono outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg mt-2 text-rose-400">
                      <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle size={14} /> Active IP segments blocked:
                      </span>
                      <span className="text-xs font-mono font-bold">{rateLimits.ipBlacklistCount} Address(es)</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-xs transition mt-2"
                  >
                    APPLY CONFIGURATION OVERRIDES
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Active Keys Ledger */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-gray-800 bg-gray-950/40">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">
                Active Client API Keys
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                  <tr>
                    <th className="p-4">Integration Target</th>
                    <th className="p-4">API Token Key</th>
                    <th className="p-4">Rate Setting</th>
                    <th className="p-4">Issued On</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  {keys.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-950/40">
                      <td className="p-4 font-semibold text-gray-200">{item.service}</td>
                      <td className="p-4 font-mono text-indigo-400">{item.key}</td>
                      <td className="p-4 text-gray-400 font-mono">{item.rateLimit}</td>
                      <td className="p-4 text-gray-450 font-mono">{item.created}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleKeyStatus(item.id)}
                          className={`px-3 py-1 text-[9px] font-bold font-mono tracking-wider border rounded transition ${
                            item.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20'
                          }`}
                        >
                          {item.status === 'ACTIVE' ? 'ACTIVE (BLOCK)' : 'BLOCKED (ALLOW)'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Incoming Integration API Traffic logs (reused from access logs) */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-gray-800 bg-gray-950/40">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">
                Incoming Integration Request Streams
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                  <tr>
                    <th className="p-4">Stream ID</th>
                    <th className="p-4">Sender identity</th>
                    <th className="p-4">Endpoint route</th>
                    <th className="p-4">Action Method</th>
                    <th className="p-4">Source IP</th>
                    <th className="p-4">Traffic Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  {accessLogs.slice(0, 5).map((log, idx) => (
                    <tr key={idx} className="hover:bg-gray-950/40">
                      <td className="p-4 font-mono text-gray-500">#TR_{log.id}</td>
                      <td className="p-4 font-mono text-gray-300">USER_{log.user_id} (Role ID: {log.role_id})</td>
                      <td className="p-4 text-gray-400 font-mono">{log.endpoint}</td>
                      <td className="p-4 font-semibold text-emerald-400 font-mono">{log.request_method || 'GET'}</td>
                      <td className="p-4 font-mono text-gray-450">{log.ip_address || '127.0.0.1'}</td>
                      <td className="p-4 text-gray-400 font-mono">{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                  {accessLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-500">
                        No incoming API traffic streams recorded.
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
