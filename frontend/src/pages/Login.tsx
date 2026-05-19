import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="h-screen w-full flex bg-slate-950 text-slate-900 font-sans antialiased overflow-hidden relative selection:bg-emerald-500/10">
      
      {/* ==================== HIGH-END BACKGROUND GRAPHIC EFFECTS ==================== */}
      {/* Top-left ambient emerald glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Center abstract indigo gradient wash */}
      <div className="absolute bottom-[-20%] right-[20%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ==================== LEFT SIDE: PREMIUM BRAND VALUATION ==================== */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 z-10 relative border-r border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-white font-black text-lg tracking-tighter">W</span>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block">WealthX</span>
            <span className="text-[9px] font-bold text-emerald-500 tracking-widest uppercase block -mt-0.5">Secure Gateway</span>
          </div>
        </div>

        {/* Core Value Proposition */}
        <div className="max-w-xl my-auto space-y-6">
          <span className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Institutional Terminal v3.4
          </span>
          
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Smart Wealth <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>
          
          <p className="text-slate-400 text-base leading-relaxed font-medium">
            Access your secure dashboard for unified financial visibility across Equities, Direct Mutual Funds, Automated SIP Architectures, and Alternative Real Estate Assets.
          </p>
        </div>

        {/* Security / Compliance Tagline */}
        <div className="flex items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            🔒 AES-256 Encrypted
          </span>
          <span>
            ISO 27001 Certified
          </span>
        </div>
      </div>

      {/* ==================== RIGHT SIDE: AUTHENTICATION FRAMEWORK ==================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10 bg-slate-950/40 backdrop-blur-3xl">
        <div className="w-full max-w-md transform transition-all duration-300">
          
          {/* Mobile-Only Brand Header (Shows only when screen is small) */}
          <div className="flex flex-col items-center mb-8 lg:hidden text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-3">
              <span className="text-white font-black text-2xl tracking-tighter">W</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">WealthX Terminal</h2>
            <p className="text-xs text-slate-500 font-bold tracking-wide mt-1">Unified Wealth Intelligence Platform</p>
          </div>

          {/* Core Embedded Login Form Wrapper */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-8 sm:p-10 rounded-[28px] shadow-2xl shadow-black/50">
            <LoginForm />
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default Login;