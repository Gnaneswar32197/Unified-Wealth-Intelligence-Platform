import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Download } from 'lucide-react';

export default function ComplianceReports() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  async function fetchReports() {
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/compliance/reports', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setData(data.reports || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const handleExport = async (type: string) => {
    setExporting(true);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch(`http://localhost:5000/api/compliance/export/${type}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await res.json();
      if (resData.success) {
        // Trigger download of json data
        const blob = new Blob([JSON.stringify(resData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compliance_report_${type}_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert(resData.message || 'Export failed');
      }
    } catch (err) {
      console.error(err);
      alert('Export failed due to network error');
    } finally {
      setExporting(false);
    }
  };

  return (
    <PageTemplate
      title="Compliance Reports"
      subtitle="Generate audit reports, inspect data schemas, and download institutional records."
      details={[
        'Query system actions across distinct user scopes and network channels',
        'Verify audit trail consistency and check compliance thresholds',
        'Export compliance reports in standardized JSON formats for external audits',
        'Ensure system events satisfy data retention laws and platform standards'
      ]}
    >
      <div className="mt-8 flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider font-mono">
          System Audited Reports
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('standard')}
            disabled={exporting}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Download size={14} />
            Export Audit Ledger
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="p-4">Report ID</th>
                  <th className="p-4">Action Type</th>
                  <th className="p-4">Route Path</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Audited Date</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-950/40">
                    <td className="p-4 font-mono text-gray-500">#{item.id}</td>
                    <td className="p-4 font-semibold text-gray-200 font-mono">{item.action_type}</td>
                    <td className="p-4 text-gray-400 font-mono">{item.endpoint}</td>
                    <td className="p-4 font-mono uppercase">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.request_method === 'GET' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        item.request_method === 'POST' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.request_method || 'GET'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 font-mono">{new Date(item.created_at).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                        item.action_status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {item.action_status}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No audited compliance reports found.
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
