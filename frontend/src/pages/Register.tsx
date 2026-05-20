import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-150 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl rounded-[2rem] border border-gray-850 bg-gray-900/90 p-10 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-mono">
            New Deployment Wizard
          </p>
          <h1 className="mt-4 text-2xl font-black text-white">
            Register your wealth intelligence instance
          </h1>
          <p className="mt-3 text-xs leading-5 text-gray-400 font-mono">
            Configure your node quickly and then sign in to begin monitoring assets.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Institution Name
            </label>
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-850 bg-gray-950 px-4 py-3 text-xs text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
              placeholder="Global Wealth Intelligence"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Admin Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-xl border border-gray-850 bg-gray-950 px-4 py-3 text-xs text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
              placeholder="admin@wealth.io"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-xl border border-gray-850 bg-gray-950 px-4 py-3 text-xs text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
              placeholder="Enter a secure password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/10 hover:opacity-90 transition font-mono"
          >
            Launch Instance
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 font-mono">
          Already have an instance?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-350">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}