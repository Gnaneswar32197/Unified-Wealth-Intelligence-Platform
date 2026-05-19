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
    <div className="min-h-screen bg-slate-950 text-gray-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">New Deployment Wizard</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Register your wealth intelligence instance</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Configure your node quickly and then sign in to begin monitoring assets.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Institution Name</label>
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
              placeholder="Global Wealth Intelligence"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Admin Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
              placeholder="admin@wealth.io"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
              placeholder="Enter a secure password"
            />
          </div>

          <button type="submit" className="w-full rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
            Launch Instance
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an instance?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}