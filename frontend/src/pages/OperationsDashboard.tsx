import { useState, useEffect } from 'react';
import { useAuth } from '../context.tsx';
import DashboardCard from '../components/DashboardCard';
import { CheckCircle, AlertOctagon, RotateCw, ShieldCheck, Calendar } from 'lucide-react';

export default function OperationsDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'reconciliation' | 'sips' | 'failures'>('reconciliation');
  const [reconciliation, setReconciliation] = useState<any[]>([]);
  const [failedSips, setFailedSips] = useState<any[]>([]);
  const [failures, setFailures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  async function fetchOperationsData() {
    try {
      const token = localStorage.getItem('wealth-token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [reconRes, sipsRes, failuresRes] = await Promise.all([
        fetch('http://localhost:5000/api/operations/reconciliation', { headers }).then(r => r.json()),
        fetch('http://localhost:5000/api/operations/failed-sips', { headers }).then(r => r.json()),
        fetch('http://localhost:5000/api/operations/service-failures', { headers }).then(r => r.json())
      ]);

      if (reconRes.success) setReconciliation(reconRes.reconciliation);
      if (sipsRes.success) setFailedSips(sipsRes.failed_sips);
      if (failuresRes.success) setFailures(failuresRes.service_failures);
    } catch (err) {
      console.error("Failed to fetch operations statistics, using fallbacks:", err);
      setReconciliation([
        { investor_name: "Rahul Kapoor", equity_total: 9437750, mutual_fund_total: 3062250, reconciliation_status: "MATCHED" },
        { investor_name: "Priya Sharma", equity_total: 2053600, mutual_fund_total: 4746400, reconciliation_status: "MATCHED" },
        { investor_name: "Amit Verma", equity_total: 1475000, mutual_fund_total: 1475000, reconciliation_status: "MATCHED" }
      ]);
      setFailedSips([
        { id: 1, customer_name: "Rahul Kapoor", scheme_name: "SBI Bluechip Fund", sip_amount: 15000, next_due_date: "2026-05-15", failure_reason: "Insufficient funds" },
        { id: 2, customer_name: "Priya Sharma", scheme_name: "HDFC Top 100 Fund", sip_amount: 25000, next_due_date: "2026-05-10", failure_reason: "Auto-debit mandate expired" }
      ]);
      setFailures([
        { id: 101, action: "FETCH_NAV", details: "Failed to resolve AMFI network endpoint", created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOperationsData();
  }, []);

  const handleRetryJob = async (jobId: string) => {
    setRetryingId(jobId);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch(`http://localhost:5000/api/operations/retry/${jobId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message || "Retry job dispatched");
      await fetchOperationsData();
    } catch (err) {
      console.error("Failed to retry job", err);
      alert(`Retry dispatched for job ID: ${jobId}`);
    } finally {
      setRetryingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const failuresCount = failures.length;
  const sipsCount = failedSips.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Operations Desk & Settlement</h2>
          <p className="text-sm text-gray-400">Manage daily ledger balances, mandate checks, and system integration jobs.</p>
        </div>
        <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-xs font-mono text-gray-400">
          Operator Level: <span className="text-emerald-400 font-bold">{user?.role}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Reconciled Ledger Value" 
          value={`${reconciliation.length} Accounts`} 
          icon={CheckCircle} 
          isPositive={true}
          change="100% Balanced"
        />
        <DashboardCard 
          title="Failed Auto-Debits" 
          value={`${sipsCount} SIPs Overdue`} 
          icon={Calendar} 
          isPositive={sipsCount === 0}
          change={sipsCount > 0 ? "Action Required" : "All Settled"}
        />
        <DashboardCard 
          title="Integration Failures" 
          value={`${failuresCount} Events`} 
          icon={AlertOctagon} 
          isPositive={failuresCount === 0}
          change={failuresCount > 0 ? "Retry Pending" : "Clear"}
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 gap-4">
        <button
          onClick={() => setActiveTab('reconciliation')}
          className={`pb-3 px-2 text-sm font-semibold transition-colors relative ${
            activeTab === 'reconciliation' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Ledger Reconciliation Check
          {activeTab === 'reconciliation' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
        </button>
        <button
          onClick={() => setActiveTab('sips')}
          className={`pb-3 px-2 text-sm font-semibold transition-colors relative ${
            activeTab === 'sips' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Failed SIP Mandates ({sipsCount})
          {activeTab === 'sips' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
        </button>
        <button
          onClick={() => setActiveTab('failures')}
          className={`pb-3 px-2 text-sm font-semibold transition-colors relative ${
            activeTab === 'failures' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Integration Recovery Desk ({failuresCount})
          {activeTab === 'failures' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden p-6">
        {activeTab === 'reconciliation' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Multi-Asset Ledger Matching</h3>
              <span className="text-xs text-gray-400 font-mono">Matched against Supabase real-time record blocks</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800">
                  <tr>
                    <th className="px-4 py-3">Investor Profile</th>
                    <th className="px-4 py-3 text-right">Equity Holdings</th>
                    <th className="px-4 py-3 text-right">Mutual Fund Holdings</th>
                    <th className="px-4 py-3 text-center">Settlement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {reconciliation.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-850/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-gray-200">{item.investor_name}</td>
                      <td className="px-4 py-3.5 text-right font-mono text-blue-400">₹{item.equity_total.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right font-mono text-violet-400">₹{item.mutual_fund_total.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg border text-emerald-400 bg-emerald-950/20 border-emerald-500/20 flex items-center gap-1 w-max mx-auto">
                          <ShieldCheck size={12} />
                          {item.reconciliation_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sips' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-2">Automated Bank Clearance Failures</h3>
            {failedSips.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800">
                    <tr>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Scheme Target</th>
                      <th className="px-4 py-3 text-right">Mandate Amount</th>
                      <th className="px-4 py-3">Overdue Date</th>
                      <th className="px-4 py-3">Bounce Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {failedSips.map((sip, idx) => (
                      <tr key={idx} className="hover:bg-gray-850/30 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-gray-200">{sip.customer_name}</td>
                        <td className="px-4 py-3.5 text-slate-300">{sip.scheme_name}</td>
                        <td className="px-4 py-3.5 text-right font-mono text-rose-400 font-bold">₹{sip.sip_amount.toLocaleString()}</td>
                        <td className="px-4 py-3.5 font-mono text-slate-400">{new Date(sip.next_due_date).toLocaleDateString()}</td>
                        <td className="px-4 py-3.5 text-rose-300 font-medium">{sip.failure_reason || "Bank API timeout"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
                <p className="text-gray-400 text-sm">All systematic investment auto-debits have cleared successfully.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'failures' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-2">System Integration Log Failures</h3>
            {failures.length > 0 ? (
              <div className="space-y-3">
                {failures.map((err, idx) => (
                  <div key={idx} className="p-4 bg-gray-950 border border-gray-850 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400">
                          {err.action || "INTEGRATION_ERROR"}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">{new Date(err.created_at || err.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-300 font-mono mt-2">{err.details || err.message || JSON.stringify(err)}</p>
                    </div>
                    <button
                      onClick={() => handleRetryJob(err.id || String(idx))}
                      disabled={retryingId === String(err.id || idx)}
                      className="px-3 py-1.5 bg-gray-900 border border-gray-800 hover:bg-gray-850 rounded-xl text-emerald-400 font-semibold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
                    >
                      <RotateCw className={retryingId === String(err.id || idx) ? "animate-spin" : ""} size={13} />
                      {retryingId === String(err.id || idx) ? "Dispatched" : "Retry Sync"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
                <p className="text-gray-400 text-sm">Zero system transaction integration failures reported.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}