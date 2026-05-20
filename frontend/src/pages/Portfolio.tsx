import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Search, ArrowRight, ShieldCheck, User } from 'lucide-react';

export default function Portfolio() {
  const [investors, setInvestors] = useState<any[]>([]);
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(null);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    async function fetchInvestors() {
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch('http://localhost:5000/api/rm/investors', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setInvestors(data.investors || []);
          if (data.investors && data.investors.length > 0) {
            setSelectedInvestorId(data.investors[0].id);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchInvestors();
  }, []);

  useEffect(() => {
    if (!selectedInvestorId) return;

    async function fetchPortfolio() {
      setDetailLoading(true);
      try {
        const token = localStorage.getItem('wealth-token');
        const res = await fetch(`http://localhost:5000/api/investors/portfolio/${selectedInvestorId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setPortfolio(data);
        } else {
          setPortfolio(null);
        }
      } catch (err) {
        console.error(err);
        setPortfolio(null);
      } finally {
        setDetailLoading(false);
      }
    }
    fetchPortfolio();
  }, [selectedInvestorId]);

  return (
    <PageTemplate
      title="Investment Portfolios"
      subtitle="Cross-asset ledger aggregation. Direct interface to equity custody databases and mutual fund houses."
      details={[
        'Query unified portfolio allocations (Equity holdings and Mutual fund units)',
        'Check PAN validation status against internal governance registries',
        'Verify custody transaction links across distinct node networks',
        'Execute rebalancing simulations or update investor allocation locks'
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Investor Select Sidebar */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-fit">
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2 font-mono">
            <Search className="text-emerald-400" size={15} />
            Investor Registry
          </h3>
          {loading ? (
            <div className="py-8 text-center text-xs text-gray-500 animate-pulse">Loading investors...</div>
          ) : investors.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">No active investors found.</div>
          ) : (
            <div className="space-y-2">
              {investors.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => setSelectedInvestorId(inv.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex justify-between items-center ${
                    selectedInvestorId === inv.id
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold'
                      : 'bg-gray-950/60 border-gray-850 hover:bg-gray-950 hover:border-gray-800 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <User size={15} className={selectedInvestorId === inv.id ? 'text-emerald-400' : 'text-gray-500'} />
                    <div>
                      <p className="text-xs font-semibold">{inv.full_name}</p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">{inv.pan_number}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className={selectedInvestorId === inv.id ? 'text-emerald-400' : 'text-gray-600'} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio Asset Details view */}
        <div className="lg:col-span-2 space-y-6">
          {detailLoading ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 flex flex-col justify-center items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="text-xs text-gray-500 font-mono">Aggregating cross-asset balances...</p>
            </div>
          ) : !portfolio ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-xs text-gray-500">
              Select an investor from the registry to inspect holdings.
            </div>
          ) : (
            <>
              {/* Profile Card */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-100">{portfolio.investor?.full_name}</h3>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider font-mono flex items-center gap-1">
                      <ShieldCheck size={11} /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono mt-1">PAN: {portfolio.investor?.pan_number} | ID: {portfolio.investor?.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold font-mono">Aggregated Asset Value</p>
                  <p className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    ${((portfolio.equity?.total_value || 0) + (portfolio.mutual_funds?.total_value || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Equity Holdings Asset Class */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">
                    Equity Custody Desk
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Total: ${portfolio.equity?.total_value?.toLocaleString() || '0'}
                  </span>
                </div>

                {!portfolio.equity?.holdings || portfolio.equity.holdings.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No active equity investments.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                        <tr>
                          <th className="p-3">Ticker</th>
                          <th className="p-3">Shares</th>
                          <th className="p-3 text-right">Avg Price</th>
                          <th className="p-3 text-right">Current Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-850">
                        {portfolio.equity.holdings.map((h: any, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-950/40">
                            <td className="p-3 font-semibold text-gray-200 font-mono">{h.ticker}</td>
                            <td className="p-3 text-gray-400 font-mono">{h.shares}</td>
                            <td className="p-3 text-right text-gray-400 font-mono">${Number(h.avg_price).toFixed(2)}</td>
                            <td className="p-3 text-right text-emerald-400 font-semibold font-mono">
                              ${(h.shares * h.avg_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Mutual Fund Pools Asset Class */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">
                    Mutual Fund Investment Pools
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Total: ${portfolio.mutual_funds?.total_value?.toLocaleString() || '0'}
                  </span>
                </div>

                {!portfolio.mutual_funds?.funds || portfolio.mutual_funds.funds.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No active mutual fund allocations.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                        <tr>
                          <th className="p-3">Fund Scheme</th>
                          <th className="p-3">Allocated Units</th>
                          <th className="p-3 text-right">NAV Val</th>
                          <th className="p-3 text-right">Aggregate value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-850">
                        {portfolio.mutual_funds.funds.map((f: any, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-950/40">
                            <td className="p-3 font-semibold text-gray-200">{f.fund}</td>
                            <td className="p-3 text-gray-400 font-mono">{f.units}</td>
                            <td className="p-3 text-right text-gray-400 font-mono">${Number(f.nav).toFixed(2)}</td>
                            <td className="p-3 text-right text-emerald-400 font-semibold font-mono">
                              ${(f.units * f.nav).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
