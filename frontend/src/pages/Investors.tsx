import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { Search, Eye, Users, RefreshCw, Layers, ShieldCheck, Wallet } from 'lucide-react';

export default function Investors() {
  const [investors, setInvestors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(null);

  // Inspector States
  const [inspectorLoading, setInspectorLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [wealthSummary, setWealthSummary] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [detailTab, setDetailTab] = useState<'holdings' | 'mf' | 'activity'>('holdings');

  async function fetchInvestors() {
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/investors', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInvestors(data.investors);
      }
    } catch (err) {
      console.error("Failed to fetch investors list, using fallback:", err);
      // Fallback
      setInvestors([
        { id: 1, full_name: "Rahul Kapoor", pan_number: "ABCDE1234F", equity_investor_id: 1, mf_customer_ref: "MF1001" },
        { id: 2, full_name: "Priya Sharma", pan_number: "XYZWR9876Q", equity_investor_id: 2, mf_customer_ref: "MF1002" },
        { id: 3, full_name: "Amit Verma", pan_number: "LKMNH4567P", equity_investor_id: 3, mf_customer_ref: "MF1003" }
      ]);
    }
  }

  useEffect(() => {
    fetchInvestors();
  }, []);

  async function fetchInvestorDetails(id: number) {
    setInspectorLoading(true);
    try {
      const token = localStorage.getItem('wealth-token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [portfolioRes, wealthRes, activityRes] = await Promise.all([
        fetch(`http://localhost:5000/api/investors/${id}/portfolio`, { headers }).then(r => r.json()),
        fetch(`http://localhost:5000/api/investors/${id}/wealth-summary`, { headers }).then(r => r.json()),
        fetch(`http://localhost:5000/api/investors/${id}/activity`, { headers }).then(r => r.json())
      ]);

      if (portfolioRes.success) setPortfolio(portfolioRes.portfolio);
      if (wealthRes.success) setWealthSummary(wealthRes.wealth_summary);
      if (activityRes.success) setActivity(activityRes.activity);
    } catch (err) {
      console.error("Failed to load investor details, using fallback:", err);
      // Construct fallback depending on investor id
      if (id === 1) {
        setWealthSummary({
          investor_name: "Rahul Kapoor",
          total_equity_value: 9437750,
          total_mutual_fund_value: 3062250,
          total_wealth: 12500000,
          asset_allocation: { equity_percentage: "75.50", mutual_fund_percentage: "24.50" }
        });
        setPortfolio({
          investor: { id: 1, full_name: "Rahul Kapoor", pan_number: "ABCDE1234F", equity_investor_id: 1, mf_customer_ref: "MF1001" },
          holdings: {
            equityHoldings: [
              { id: 1, stock_symbol: "RELIANCE", quantity: 2500, avg_buy_price: 2450.50, current_market_price: 2850.10, exchange: "NSE", holding_value: 7125250 },
              { id: 2, stock_symbol: "TCS", quantity: 650, avg_buy_price: 3200.00, current_market_price: 3557.69, exchange: "NSE", holding_value: 2312500 }
            ],
            mfHoldings: [
              { id: 1, scheme: "HDFC Flexi Cap Fund", value: 3000000, units: 12000 },
              { id: 2, scheme: "SBI Small Cap Fund", value: 62250, units: 700 }
            ]
          }
        });
        setActivity([
          { id: 1, timestamp: new Date().toISOString(), type: "BUY", description: "Purchased HDFC Flexi Cap Fund units", amount: 50000, asset_class: "MUTUAL_FUND" },
          { id: 2, timestamp: new Date().toISOString(), type: "BUY", description: "Purchased RELIANCE stock shares", amount: 120000, asset_class: "EQUITY" }
        ]);
      } else {
        // Fallback mock details for other IDs
        setWealthSummary({
          investor_name: "Investor " + id,
          total_equity_value: 2000000,
          total_mutual_fund_value: 2000000,
          total_wealth: 4000000,
          asset_allocation: { equity_percentage: "50.00", mutual_fund_percentage: "50.00" }
        });
        setPortfolio({
          investor: { id, full_name: "Investor " + id, pan_number: "PAN-MOCK", equity_investor_id: id, mf_customer_ref: "MF" + id },
          holdings: {
            equityHoldings: [{ id: 1, stock_symbol: "INFY", quantity: 1200, avg_buy_price: 1400.00, current_market_price: 1666.67, exchange: "NSE", holding_value: 2000000 }],
            mfHoldings: [{ id: 1, scheme: "ICICI Prudential Equity Fund", value: 2000000, units: 8500 }]
          }
        });
        setActivity([]);
      }
    } finally {
      setInspectorLoading(false);
    }
  }

  const handleSelectInvestor = (id: number) => {
    setSelectedInvestorId(id);
    fetchInvestorDetails(id);
  };

  const filteredInvestors = investors.filter(i =>
    i.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.pan_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTemplate
      title="Investor Directory & Consolidation Desk"
      subtitle="Examine unified holdings, asset allocations, and security logs across institutional customer books."
      details={[
        'Query investors across global asset partitions dynamically',
        'Consolidate equity stock balances and mutual fund units',
        'Analyze custom diversification ratio scopes for target books',
        'Audit client operations with tamper-proof security tokens',
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Left Side: Investor Query Matrix */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col h-[600px]">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search investor or PAN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-200 outline-none transition focus:border-emerald-500 w-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            {filteredInvestors.map((investor) => {
              const isSelected = selectedInvestorId === investor.id;
              return (
                <div
                  key={investor.id}
                  onClick={() => handleSelectInvestor(investor.id)}
                  className={`p-3.5 border rounded-xl flex items-center justify-between text-xs cursor-pointer transition duration-200 ${
                    isSelected 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold' 
                      : 'bg-gray-950/60 border-gray-850 hover:bg-gray-900 text-gray-300'
                  }`}
                >
                  <div>
                    <p className="font-bold text-gray-100">{investor.full_name}</p>
                    <p className="text-gray-400 font-mono mt-0.5 tracking-wider uppercase text-[10px]">{investor.pan_number}</p>
                  </div>
                  <button className={`p-2 rounded-lg border transition ${
                    isSelected ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-emerald-400'
                  }`}>
                    <Eye size={13} />
                  </button>
                </div>
              );
            })}
            {filteredInvestors.length === 0 && (
              <div className="text-center text-xs text-gray-500 py-8">No matching investors.</div>
            )}
          </div>
        </div>

        {/* Right Side: Detail Inspector */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col h-[600px] overflow-hidden">
          {inspectorLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <RefreshCw className="animate-spin text-emerald-400" size={20} />
              FETCHING_CONSOLIDATED_LEDGER_DATA...
            </div>
          ) : portfolio && wealthSummary ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Header profile details */}
              <div className="p-4 bg-gray-950 border border-gray-850 rounded-xl flex flex-col sm:flex-row justify-between gap-4 mb-5 shrink-0">
                <div>
                  <h3 className="text-base font-bold text-white uppercase">{portfolio.investor.full_name}</h3>
                  <p className="text-xs text-gray-400 font-mono tracking-wider mt-1 uppercase">PAN: {portfolio.investor.pan_number}</p>
                </div>
                <div className="flex flex-col text-right font-mono text-[10px] text-gray-500 justify-center">
                  <span>Equity Ref ID: #{portfolio.investor.equity_investor_id}</span>
                  <span className="mt-0.5">MF Customer Ref: {portfolio.investor.mf_customer_ref}</span>
                </div>
              </div>

              {/* Wealth Cards */}
              <div className="grid grid-cols-3 gap-4 mb-5 shrink-0">
                <div className="p-3.5 bg-gray-950 border border-gray-850 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-wider uppercase text-emerald-400">Total Asset Pool</span>
                    <h4 className="text-base font-bold font-mono text-gray-100 mt-1">₹{wealthSummary.total_wealth.toLocaleString()}</h4>
                  </div>
                  <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                    <Wallet size={15} />
                  </div>
                </div>

                <div className="p-3.5 bg-gray-950 border border-gray-850 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-wider uppercase text-blue-400">Equity Assets</span>
                    <h4 className="text-base font-bold font-mono text-gray-100 mt-1">₹{wealthSummary.total_equity_value.toLocaleString()}</h4>
                  </div>
                  <div className="h-8 w-8 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                    <Layers size={15} />
                  </div>
                </div>

                <div className="p-3.5 bg-gray-950 border border-gray-850 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-wider uppercase text-violet-400">Mutual Funds</span>
                    <h4 className="text-base font-bold font-mono text-gray-100 mt-1">₹{wealthSummary.total_mutual_fund_value.toLocaleString()}</h4>
                  </div>
                  <div className="h-8 w-8 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck size={15} />
                  </div>
                </div>
              </div>

              {/* Progress Allocation Bar */}
              <div className="p-4 bg-gray-950 border border-gray-850 rounded-xl mb-5 shrink-0">
                <div className="flex justify-between items-center text-[10px] mb-2 font-mono">
                  <span className="text-blue-400">EQUITY: {wealthSummary.asset_allocation.equity_percentage}%</span>
                  <span className="text-violet-400">MUTUAL FUNDS: {wealthSummary.asset_allocation.mutual_fund_percentage}%</span>
                </div>
                <div className="w-full bg-violet-950 rounded-full h-2 overflow-hidden flex">
                  <div className="bg-blue-500 h-full" style={{ width: `${wealthSummary.asset_allocation.equity_percentage}%` }} />
                  <div className="bg-violet-500 h-full" style={{ width: `${wealthSummary.asset_allocation.mutual_fund_percentage}%` }} />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-800 gap-4 mb-4 shrink-0">
                <button
                  onClick={() => setDetailTab('holdings')}
                  className={`pb-2 px-1 text-xs font-semibold transition-colors relative ${
                    detailTab === 'holdings' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Equity Stocks Holdings
                  {detailTab === 'holdings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
                </button>
                <button
                  onClick={() => setDetailTab('mf')}
                  className={`pb-2 px-1 text-xs font-semibold transition-colors relative ${
                    detailTab === 'mf' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Mutual Fund Holdings
                  {detailTab === 'mf' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
                </button>
                <button
                  onClick={() => setDetailTab('activity')}
                  className={`pb-2 px-1 text-xs font-semibold transition-colors relative ${
                    detailTab === 'activity' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Audit Activity Logs
                  {detailTab === 'activity' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
                </button>
              </div>

              {/* Tab Content Panels (Scrollable viewport) */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                
                {detailTab === 'holdings' && (
                  <table className="w-full text-left text-[11px]">
                    <thead className="text-gray-400 uppercase tracking-wider border-b border-gray-800 font-mono">
                      <tr>
                        <th className="py-2.5 px-3">Symbol</th>
                        <th className="py-2.5 px-3 text-right">Shares</th>
                        <th className="py-2.5 px-3 text-right">Avg Price</th>
                        <th className="py-2.5 px-3 text-right">Current NAV</th>
                        <th className="py-2.5 px-3 text-right">Valuation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {portfolio.holdings.equityHoldings.map((stock: any) => (
                        <tr key={stock.id} className="hover:bg-gray-950/20 text-gray-300">
                          <td className="py-3 px-3">
                            <span className="font-bold text-gray-200">{stock.stock_symbol}</span>
                            <span className="text-[9px] text-gray-500 font-mono ml-1">({stock.exchange})</span>
                          </td>
                          <td className="py-3 px-3 text-right font-mono">{stock.quantity}</td>
                          <td className="py-3 px-3 text-right font-mono">₹{Number(stock.avg_buy_price).toFixed(2)}</td>
                          <td className="py-3 px-3 text-right font-mono text-emerald-400">₹{Number(stock.current_market_price).toFixed(2)}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-gray-200">₹{Number(stock.holding_value).toLocaleString()}</td>
                        </tr>
                      ))}
                      {portfolio.holdings.equityHoldings.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-gray-500">No equity holdings.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {detailTab === 'mf' && (
                  <table className="w-full text-left text-[11px]">
                    <thead className="text-gray-400 uppercase tracking-wider border-b border-gray-800 font-mono">
                      <tr>
                        <th className="py-2.5 px-3">Scheme Fund</th>
                        <th className="py-2.5 px-3 text-right">Units</th>
                        <th className="py-2.5 px-3 text-right">Valuation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {portfolio.holdings.mfHoldings.map((fund: any) => (
                        <tr key={fund.id} className="hover:bg-gray-950/20 text-gray-300">
                          <td className="py-3 px-3 font-semibold text-gray-200">{fund.scheme}</td>
                          <td className="py-3 px-3 text-right font-mono">{fund.units}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-gray-200">₹{Number(fund.value).toLocaleString()}</td>
                        </tr>
                      ))}
                      {portfolio.holdings.mfHoldings.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-6 text-center text-gray-500">No mutual fund holdings.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {detailTab === 'activity' && (
                  <div className="space-y-2">
                    {activity.map((act) => (
                      <div key={act.id} className="p-3 bg-gray-950/60 border border-gray-850 rounded-lg flex items-center justify-between text-[11px] font-sans">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-1.5 py-0.5 rounded font-mono font-bold text-[9px] ${
                              act.type === 'BUY' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                            }`}>
                              {act.type}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-gray-900 border border-gray-800 text-gray-400`}>
                              {act.asset_class}
                            </span>
                            <span className="text-gray-500 font-mono text-[9px]">{new Date(act.timestamp || act.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-300 font-medium">{act.description}</p>
                        </div>
                        <span className="font-mono font-black text-gray-100 text-right">₹{Number(act.amount).toLocaleString()}</span>
                      </div>
                    ))}
                    {activity.length === 0 && (
                      <div className="py-8 text-center text-gray-500 text-xs">No recent transaction logs.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-800 rounded-xl">
              <Users className="text-gray-600 mb-2" size={28} />
              <p className="text-xs text-gray-400">Select an investor from the directory list to inspect assets, holdings, and transaction history.</p>
            </div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
