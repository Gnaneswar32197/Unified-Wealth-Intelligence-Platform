import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  Search,
  Cpu,
  ShieldCheck,
  UserCheck,
  RefreshCw,
  TrendingUp,
  ArrowUpRight,
  Home as HomeIcon,
  Database,
  AlertTriangle,
  Lock
} from "lucide-react";

// ==========================================
// TYPE DEFINITIONS & ARCHITECTURAL SCHEMAS
// ==========================================
interface AssetMetric {
  id: string;
  label: string;
  value: number;
  badge?: string;
  subtext: string;
  icon?: React.ReactNode;
}

interface SubsystemPipeline {
  id: string;
  title: string;
  description: string;
  route: string;
  securityProfile: string;
  statusText: string;
  statusVariant: "success" | "stable" | "native";
  icon: React.ReactNode;
  bgIconClass: string;
  textIconClass: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [systemStatus, setSystemStatus] = useState<string>("DEGRADED OPERATION CORES");

  // ==========================================
  // UTILITY: INDIAN FINANCIAL CURRENCY FORMATTER
  // ==========================================
  const formatIndianCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ==========================================
  // DATA CORE: CORE ASSET METRICS
  // ==========================================
  const assetMetrics: AssetMetric[] = [
    {
      id: "total_portfolio",
      label: "Total Portfolio Asset Base",
      value: 28450000,
      badge: "+12.4%",
      subtext: "Cross-System Aggregate"
    },
    {
      id: "equity_holdings",
      label: "Equity Holdings Portfolio",
      value: 12400000,
      subtext: "External API Verified",
      icon: <Lock className="w-3 h-3 text-indigo-400/60" />
    },
    {
      id: "mutual_funds",
      label: "Mutual Fund Assets (SIP)",
      value: 8250000,
      subtext: "Real-time NAV Tracked"
    },
    {
      id: "real_estate",
      label: "Internal Real Estate Ledger",
      value: 7800000,
      subtext: "Isolated SQL DB Records",
      icon: <Database className="w-3 h-3 text-cyan-400/60" />
    }
  ];

  // ==========================================
  // DATA CORE: DOWNSTREAM PIPELINE CONFIG
  // ==========================================
  const subsystems: SubsystemPipeline[] = [
    {
      id: "equity_pipeline",
      title: "Equity Pipeline Module",
      description: "Aggregates and normalizes cross-broker stock holdings, user asset transactions, and portfolio activity feeds.",
      route: "/analytics",
      securityProfile: "Security: JWT Access Context",
      statusText: "Synced",
      statusVariant: "success",
      icon: <TrendingUp className="w-4 h-4" />,
      bgIconClass: "bg-indigo-500/5 border-indigo-500/20",
      textIconClass: "text-indigo-400 group-hover:text-indigo-400"
    },
    {
      id: "mutual_fund_engine",
      title: "Mutual Fund & SIP Engine",
      description: "Monitors active systematic investment plans, parses real-time NAV movements, and records investment distributions.",
      route: "/mutualfunds",
      securityProfile: "Auth: HMAC Signed Signature",
      statusText: "Stable",
      statusVariant: "stable",
      icon: <RefreshCw className="w-4 h-4" />,
      bgIconClass: "bg-emerald-500/5 border-emerald-500/20",
      textIconClass: "text-emerald-400 group-hover:text-emerald-400"
    },
    {
      id: "real_estate_core",
      title: "Real Estate Ledger Core",
      description: "Manages internal localized asset properties, title ownership structures, valuation models, and monthly rental income streams.",
      route: "/sipplans",
      securityProfile: "Database: PostgreSQL Schema",
      statusText: "Native",
      statusVariant: "native",
      icon: <HomeIcon className="w-4 h-4" />,
      bgIconClass: "bg-cyan-500/5 border-cyan-500/20",
      textIconClass: "text-cyan-400 group-hover:text-cyan-400"
    }
  ];

  // ==========================================
  // HANDLER: CORE PIPELINE RE-RECONCILIATION
  // ==========================================
  const handlePipelineSync = (): void => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSystemStatus("ALL SYSTEMS OPERATIONAL");
    }, 1500);
  };

  return (
    <div className="flex bg-[#030712] min-h-screen text-slate-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-400">
      
      {/* INTEGRATED SIDEBAR NAVIGATION */}
      <Sidebar />

      {/* CORE WORKSPACE AREA */}
      <main className="flex-1 p-8 lg:p-10 space-y-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
        
        {/* ================= TOP APPLICATION BAR ================= */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
          
          {/* Global Multi-Asset Search Input */}
          <div className="bg-slate-950/60 border border-slate-900 focus-within:border-slate-800 transition-colors flex items-center px-4 py-2.5 rounded-xl w-full sm:w-[380px]">
            <Search className="text-slate-500 w-4 h-4 shrink-0" />
            <input
              type="text"
              placeholder="Search unified identities or assets..."
              className="bg-transparent outline-none ml-3 text-xs text-slate-200 placeholder-slate-500 w-full"
            />
          </div>

          {/* Infrastructure Health Telemetry Metrics */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            
            {/* Caching and Gatekeeper Threshold Status Labels */}
            <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-900 select-none">
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

            {/* Notification Interface Node */}
            <button className="relative bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-slate-400 hover:text-white transition-colors focus:outline-none focus:border-slate-700">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </button>

            {/* Operational Role Profile Context */}
            <div className="flex items-center gap-3 bg-slate-950 pl-3 pr-4 py-1.5 rounded-xl border border-slate-900 select-none">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                RM
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold text-slate-200">L. Richards</p>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono block">Rel. Manager</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= WORKSPACE HEADLINE HEADER ================= */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-900 px-3 py-1 rounded-md text-slate-500 text-[10px] uppercase tracking-wider font-mono mb-3 select-none">
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

          {/* Core Pipeline Re-conciliation Action Trigger */}
          <button 
            onClick={handlePipelineSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-slate-300 px-4 py-2 rounded-xl text-xs font-medium border border-slate-900 transition-all font-mono disabled:opacity-50 focus:outline-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? "Reconciling..." : "Force Pipeline Re-Sync"}</span>
          </button>
        </section>

        {/* ================= PRIMARY CONSOLIDATED ASSET GRID ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assetMetrics.map((asset) => (
            <div 
              key={asset.id} 
              className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">{asset.label}</span>
                {asset.badge ? (
                  <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                    {asset.badge}
                  </span>
                ) : (
                  asset.icon || <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                )}
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                  {formatIndianCurrency(asset.value)}
                </h2>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{asset.subtext}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ================= CORE SUBSYSTEM ENTRY PANELS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {subsystems.map((subsystem) => (
            <div 
              key={subsystem.id}
              onClick={() => navigate(subsystem.route)} 
              className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-800 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${subsystem.bgIconClass} ${subsystem.textIconClass}`}>
                    {subsystem.icon}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-slate-200 group-hover:text-white transition-colors">
                    {subsystem.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    {subsystem.description}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>{subsystem.securityProfile}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider
                  ${subsystem.statusVariant === "success" ? "text-emerald-400 bg-emerald-500/5" : ""}
                  ${subsystem.statusVariant === "stable" ? "text-emerald-400 bg-emerald-500/5" : ""}
                  ${subsystem.statusVariant === "native" ? "text-cyan-400 bg-cyan-500/5" : ""}
                `}>
                  {subsystem.statusText}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* ================= FAULT REGISTRY / ERROR MITIGATION LOGGER ================= */}
        <footer className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Resilience Registry Alert Log
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Downstream Mutual Fund System reported a connection timeout. Handled gracefully via localized circuit degradation thresholds.
              </p>
            </div>
          </div>
          <div className={`text-[10px] font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-900 shrink-0 self-end md:self-auto font-bold transition-colors duration-300
            ${systemStatus === "ALL SYSTEMS OPERATIONAL" ? "text-emerald-400 border-emerald-950" : "text-amber-500 border-amber-950"}
          `}>
            SYSTEM STATUS: {systemStatus}
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Dashboard;