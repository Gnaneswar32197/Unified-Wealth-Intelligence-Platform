import { useState, useEffect } from 'react';
import { useAuth } from '../context.tsx';
import DashboardCard from '../components/DashboardCard';
import { BarChart3, ShieldAlert, Sparkles, TrendingUp, Search } from 'lucide-react';

export default function AdvisoryDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [diversification, setDiversification] = useState<any[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'diversification' | 'risk' | 'recommendations'>('diversification');
  const [searchQuery, setSearchQuery] = useState('');

  async function fetchAdvisoryData() {
    try {
      const token = localStorage.getItem('wealth-token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [analyticsRes, divRes, riskRes, recRes] = await Promise.all([
        fetch('http://localhost:5000/api/advisor/analytics', { headers }).then(r => r.json()),
        fetch('http://localhost:5000/api/advisor/diversification', { headers }).then(r => r.json()),
        fetch('http://localhost:5000/api/advisor/risk-analysis', { headers }).then(r => r.json()),
        fetch('http://localhost:5000/api/advisor/recommendations', { headers }).then(r => r.json())
      ]);

      if (analyticsRes.success) setAnalytics(analyticsRes.analytics);
      if (divRes.success) setDiversification(divRes.diversification_analysis);
      if (riskRes.success) setRiskAnalysis(riskRes.risk_analysis);
      if (recRes.success) setRecommendations(recRes.recommendations);
    } catch (err) {
      console.error("Failed to fetch advisor data, using fallback simulator:", err);
      // Fallbacks matching backend schema
      setAnalytics({
        total_equity_value: 12966350,
        total_mutual_fund_value: 9283650,
        total_wealth: 22250000,
        diversification_ratio: {
          equity_percentage: "58.28",
          mutual_fund_percentage: "41.72"
        }
      });
      setDiversification([
        { investor_name: "Rahul Kapoor", equity_percentage: "75.50", mutual_fund_percentage: "24.50", diversification_score: "MODERATE" },
        { investor_name: "Priya Sharma", equity_percentage: "30.20", mutual_fund_percentage: "69.80", diversification_score: "MODERATE" },
        { investor_name: "Amit Verma", equity_percentage: "50.00", mutual_fund_percentage: "50.00", diversification_score: "GOOD" }
      ]);
      setRiskAnalysis([
        { investor_name: "Rahul Kapoor", total_wealth: 12500000, equity_exposure: 9437750, mutual_fund_exposure: 3062250, risk_category: "HIGH" },
        { investor_name: "Priya Sharma", total_wealth: 6800000, equity_exposure: 2053600, mutual_fund_exposure: 4746400, risk_category: "LOW" },
        { investor_name: "Amit Verma", total_wealth: 2950000, equity_exposure: 1475000, mutual_fund_exposure: 1475000, risk_category: "MODERATE" }
      ]);
      setRecommendations([
        { investor_name: "Rahul Kapoor", recommendation: "Increase mutual fund allocation to optimize diversification balance" },
        { investor_name: "Priya Sharma", recommendation: "Increase equity exposure to boost long-term target yields" },
        { investor_name: "Amit Verma", recommendation: "Maintain current balanced portfolio structure" }
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvisoryData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Advisory Panel & Portfolio Intel</h2>
          <p className="text-sm text-gray-400">Welcome, Advisor {user?.name}. Design risk profiles and client diversification paths.</p>
        </div>
        <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-xs font-mono text-gray-400">
          Advisor Clearances: <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard 
          title="Assets Under Advisory" 
          value={`₹${((analytics?.total_wealth || 0) / 10000000).toFixed(2)} Cr`} 
          icon={TrendingUp} 
          subtext="Total managed capital pool"
        />
        <DashboardCard 
          title="Equity Allocation" 
          value={`₹${((analytics?.total_equity_value || 0) / 10000000).toFixed(2)} Cr`} 
          icon={BarChart3} 
          subtext={`${analytics?.diversification_ratio.equity_percentage}% of total book`}
        />
        <DashboardCard 
          title="Mutual Fund Allocation" 
          value={`₹${((analytics?.total_mutual_fund_value || 0) / 10000000).toFixed(2)} Cr`} 
          icon={Sparkles} 
          subtext={`${analytics?.diversification_ratio.mutual_fund_percentage}% of total book`}
        />
        <DashboardCard 
          title="Avg Book Diversification" 
          value="58 : 42" 
          icon={ShieldAlert} 
          isPositive={true}
          subtext="Equity to MF Ratio"
        />
      </div>

      {/* Allocation Ratio Bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center text-xs mb-3 font-mono">
          <span className="text-blue-400">EQUITY EXPOSURE: {analytics?.diversification_ratio.equity_percentage}%</span>
          <span className="text-violet-400">MUTUAL FUNDS EXPOSURE: {analytics?.diversification_ratio.mutual_fund_percentage}%</span>
        </div>
        <div className="w-full bg-violet-950 rounded-full h-3 overflow-hidden flex">
          <div 
            className="bg-blue-500 h-full transition-all duration-500" 
            style={{ width: `${analytics?.diversification_ratio.equity_percentage}%` }}
          />
          <div 
            className="bg-violet-500 h-full transition-all duration-500" 
            style={{ width: `${analytics?.diversification_ratio.mutual_fund_percentage}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 gap-4">
        <button
          onClick={() => setActiveTab('diversification')}
          className={`pb-3 px-2 text-sm font-semibold transition-colors relative ${
            activeTab === 'diversification' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Diversification Analysis
          {activeTab === 'diversification' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`pb-3 px-2 text-sm font-semibold transition-colors relative ${
            activeTab === 'risk' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Risk Assessment Profile
          {activeTab === 'risk' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`pb-3 px-2 text-sm font-semibold transition-colors relative ${
            activeTab === 'recommendations' ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Dynamic Action Triggers
          {activeTab === 'recommendations' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
        </button>
      </div>

      {/* Tab Panel */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
            {activeTab === 'diversification' && "Client Asset Split Matrix"}
            {activeTab === 'risk' && "Portfolio Volatility Metric Index"}
            {activeTab === 'recommendations' && "Target Advisory Dispatches"}
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-200 outline-none transition focus:border-emerald-500 w-48"
            />
            <Search className="absolute left-3 top-2 text-gray-500" size={14} />
          </div>
        </div>

        {activeTab === 'diversification' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3">Client Profile Name</th>
                  <th className="px-4 py-3 text-center">Equity Ratio</th>
                  <th className="px-4 py-3 text-center">Mutual Funds Ratio</th>
                  <th className="px-4 py-3 text-center">Diversification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {diversification
                  .filter(c => c.investor_name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-850/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-gray-200">{item.investor_name}</td>
                      <td className="px-4 py-3.5 text-center text-blue-400 font-mono">{item.equity_percentage}%</td>
                      <td className="px-4 py-3.5 text-center text-violet-400 font-mono">{item.mutual_fund_percentage}%</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.diversification_score === 'GOOD' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.diversification_score}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3">Client Profile Name</th>
                  <th className="px-4 py-3 text-right">Total Net Worth</th>
                  <th className="px-4 py-3 text-right">Equity Exposure</th>
                  <th className="px-4 py-3 text-right">Mutual Fund Exposure</th>
                  <th className="px-4 py-3 text-center">Risk Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {riskAnalysis
                  .filter(c => c.investor_name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-850/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-gray-200">{item.investor_name}</td>
                      <td className="px-4 py-3.5 text-right font-mono font-bold text-gray-200">₹{item.total_wealth.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right font-mono text-blue-400">₹{item.equity_exposure.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right font-mono text-violet-400">₹{item.mutual_fund_exposure.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.risk_category === 'HIGH' 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                            : item.risk_category === 'MODERATE'
                            ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        }`}>
                          {item.risk_category}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations
              .filter(c => c.investor_name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-950 border border-gray-850 rounded-xl flex items-center justify-between text-xs hover:border-emerald-500/30 transition duration-300">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-200">{item.investor_name}</p>
                    <p className="text-gray-400">{item.recommendation}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg font-semibold hover:bg-emerald-500/20 cursor-pointer transition">
                    Dispatch Advice
                  </span>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
