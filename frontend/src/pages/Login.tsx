import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context.tsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(
          data.user.role,
          data.user.full_name,
          data.user.email,
          data.user.employee_code,
          data.token
        );

        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Server connection failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-150 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-[2rem] border border-gray-850 bg-gray-900/90 p-8 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-mono">
            Secure Access Portal
          </p>
          <h1 className="mt-4 text-2xl font-black text-white">
            Authenticate to the Unified Dashboard
          </h1>
          <p className="mt-3 text-xs leading-5 text-gray-400 font-mono">
            Login using your registered email and password.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-850 bg-gray-950 px-4 py-3 text-xs text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                placeholder="admin@wealth.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-850 bg-gray-950 px-4 py-3 text-xs text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/10 hover:opacity-90 transition font-mono"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-xs text-gray-500 font-mono">
          Need to deploy a new instance?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-350">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}