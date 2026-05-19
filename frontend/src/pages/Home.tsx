import { useNavigate } from "react-router-dom";
import { 
  Layers, 
  Activity, 
  ArrowRight,
  PieChart
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-400 overflow-hidden">
      
      {/* SUBTLE BACKGROUND AMBIENCE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-cyan-500/[0.03] to-transparent blur-[120px] pointer-events-none z-0" />

      {/* ================= NAVBAR ================= */}
      <nav className="w-full border-b border-slate-900 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo Identity */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <Layers className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                WealthX
              </h1>
              <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-medium">
                Unified Wealth Platform
              </p>
            </div>
          </div>

          {/* Core Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: "Consolidated Portfolio", path: "/portfolio" },
              { label: "Mutual Funds", path: "/mutualfunds" },
              { label: "SIP Plans", path: "/sipplans" },
              { label: "Analytics & Graphs", path: "/analytics" }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Header Action Elements */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors px-3 py-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white hover:bg-slate-100 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>

        </div>
      </nav>

      {/* ================= HERO CONTENT ARCHITECTURE ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1 z-10">
        
        {/* Left Informational Layout */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-400 text-xs tracking-wide">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium text-[11px] uppercase tracking-wider text-slate-300">
              Multi-Asset Aggregation Core
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Modern Investing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-medium">
                Made Intelligent
              </span>
            </h2>
            
            <p className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-xl">
              Consolidate fragmented cross-system investments into a single client portfolio matrix. Seamlessly monitor equity records, mutual fund NAV trends, and internal real estate ledgers with real-time tracking.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => navigate("/portfolio")}
              className="group bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-95 text-slate-950 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/5"
            >
              Launch Core Platform
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className="px-7 py-3.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <PieChart className="w-4 h-4 text-cyan-400" />
              View Asset Graphs
            </button>
          </div>

        </div>

        {/* Right Polished Imagery Accent */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-[24px] overflow-hidden shadow-2xl p-2">
            <img
              src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop"
              alt="Platform Portfolio Allocation Matrix View"
              className="w-full h-auto rounded-[18px] opacity-90 object-cover aspect-[4/3] grayscale-[15%] contrast-[105%]"
            />
          </div>
        </div>

      </section>

      {/* ================= MINIMAL FOOTER ================= */}
      <footer className="w-full border-t border-slate-900 py-6 bg-[#030712] mt-auto z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-slate-500">
          
          <div className="flex items-center gap-1.5">
            <span>&copy; 2026 WealthX Intelligence Systems. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wide text-slate-600 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Subsystems Active
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;