import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950">W</span>
          Unified Wealth Intelligence
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-300">
          <Link to="/login" className="transition hover:text-emerald-300">Login</Link>
          <Link to="/register" className="rounded-full border border-slate-800 px-4 py-2 transition hover:border-emerald-500 hover:text-emerald-300">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}