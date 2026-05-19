import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  Search,
  Activity,
  ShieldCheck,
  Database,
  Cpu,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Home as HomeIcon,
  CheckCircle2,
  Lock,
  UserCheck
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Real-time system monitoring state simulation
  const [isSyncing, setIsSyncing] = useState(false);

  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <div className="flex bg-[#030712] min-h-screen text-slate-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-400">
      
      {/* INTEGRATED SIDEBAR */}
      <Sidebar />

      {/* WORKSPACE AREA */}
      <div className="flex-1 p-8 lg:p-10 space-y-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
        
        {/* ================= TOP APPLICATION BAR ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
          
          {/* Global Multi-Asset Search Context */}
          <div className="bg-slate-950/60 border border-slate-900 focus-within:border-slate-800 transition-colors flex items-center px-4 py-2.5 rounded-xl w-full sm:w-[380px]">
            <Search className="text-slate-500 w-4 h-4 shrink-0" />
            <input
              type="text"
              placeholder="Search unified identities or assets..."
              className="bg-transparent outline-none ml-3 text-xs text-slate-200 placeholder-slate-500 w-full"
            />
          </div>

          {/* Infrastructure Metrics & Admin Profile */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            
            {/* Live Cache & Rate Limiting Health Tags */}
            <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-900">
              <div className="flex items-center gap-1 text-slate-500">
                <Cpu className="w-3 h-3 text-cyan-500/70" />
                <span>Redis: Active</span>
              </div>
              <span className="text-slate-800">|</span>
              <div className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
                <span>Rate Limit: 60/m</span>
              </div>
            </div>

            {/* Notification Hub */}
            <button className="relative bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </button>

            {/* Identity Role Checkbox Avatar */}
            <div className="flex items-center gap-3 bg-slate-950 pl-3 pr-4 py-1.5 rounded-xl border border-slate-900">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                RM
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold text-slate-200">L. Richards</p>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono block">Rel. Manager</span>
              </div>
            </div>

          </div>
        </div>

        {/* ================= SECTION TITLE & SYSTEM TELEMETRY ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-900 px-3 py-1 rounded-md text-slate-500 text-[10px] uppercase tracking-wider font-mono mb-3">
              <UserCheck className="w-3 h-3 text-cyan-400" />
              <span>Cross-Service Investor Mapping: Secure</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-normal text-white tracking-tight">
              Consolidated Wealth Dashboard
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Aggregated portfolio visualization across disparate core infrastructure environments.
            </p>
          </div>

          {/* Resilience Trigger */}
          <button 
            onClick={triggerManualSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-slate-300 px-4 py-2 rounded-xl text-xs font-medium border border-slate-900 transition-all font-mono disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? "Reconciling..." : "Force Pipeline Re-Sync"}</span>
          </button>
        </div>

        {/* ================= PRIMARY CONSOLIDATED LEDGER METRICS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Portfolio Value Card */}
          <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Total Portfolio Asset Base</span>
              <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded font-mono text-[10px] font-bold">+12.4%</span>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-white tracking-tight">₹2,84,50,000</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Cross-System Aggregate</p>
            </div>
          </div>

          {/* Equity Holdings Segment Card */}
          <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Equity Holdings Portfolio</span>
              <Lock className="w-3 h-3 text-indigo-400/60" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-indigo-400 tracking-tight">₹1,24,00,000</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1">External API Verified</p>
            </div>
          </div>

          {/* Mutual Funds Segment Card */}
          <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Mutual Fund Assets (SIP)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-emerald-400 tracking-tight">₹82,50,000</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Real-time NAV Tracked</p>
            </div>
          </div>

          {/* Real Estate Module Card */}
          <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Internal Real Estate Ledger</span>
              <Database className="w-3 h-3 text-cyan-400/60" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-cyan-400 tracking-tight">₹78,00,000</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1">Isolated SQL DB Records</p>
            </div>
          </div>

        </div>

        {/* ================= CORE SUBSYSTEM PIPELINES ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Equity System Gateway Container */}
          <div 
            onClick={() => navigate("/analytics")} 
            className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-800 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-200">Equity Pipeline Module</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Aggregates and normalizes cross-broker stock holdings, user asset transactions, and portfolio activity feeds.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>Security: JWT Access Context</span>
              <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded">Synced</span>
            </div>
          </div>

          {/* Mutual Fund & SIP System Container */}
          <div 
            onClick={() => navigate("/mutualfunds")} 
            className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-800 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-200">Mutual Fund & SIP Engine</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Monitors active systematic investment plans, parses real-time NAV movements, and records investment distributions.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>Auth: HMAC Signed Signature</span>
              <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded">Stable</span>
            </div>
          </div>

          {/* Internal Real Estate Module Container */}
          <div 
            onClick={() => navigate("/sipplans")} // Route to internal property management sub-flows
            className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-800 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <HomeIcon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-200">Real Estate Ledger Core</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Manages internal localized asset properties, title ownership structures, valuation models, and monthly rental income streams.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>Database: PostgreSQL Schema</span>
              <span className="text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded">Native</span>
            </div>
          </div>

        </div>

        {/* ================= OPERATIONAL FAULT RESILIENCY / ALERTS PANEL ================= */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">Resilience Registry Alert Log</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Downstream Mutual Fund System reported a connection timeout. Handled gracefully via localized circuit degradation thresholds.
              </p>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded border border-slate-900 shrink-0 self-end md:self-auto">
            SYSTEM STATUS: DEGRADED OPERATION CORES
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;