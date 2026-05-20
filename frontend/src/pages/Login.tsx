// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context.tsx';

// export default function Login() {
//   const [role, setRole] = useState('Admin');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [errorMsg, setErrorMsg] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMsg('');
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok && data.success) {
//         login(data.user.role, data.user.full_name, data.user.email, data.user.employee_code, data.token);
//         navigate('/dashboard');
//       } else {
//         setErrorMsg(data.message || "Invalid email or password");
//       }
//     } catch (err) {
//       console.warn("Backend connection failed. Using local bypass login.", err);
//       login(role, `Mock ${role}`, email || `${role.toLowerCase()}@wealth.com`, "EMP-MOCK");
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-gray-100 flex items-center justify-center px-6 py-12">
//       <div className="w-full max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
//         <div className="mb-8 text-center">
//           <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Secure Access Portal</p>
//           <h1 className="mt-4 text-3xl font-semibold text-white">Authenticate to the Unified Dashboard</h1>
//           <p className="mt-3 text-sm leading-6 text-slate-400">Choose your operational role and sign in to continue.</p>
//         </div>

//         {errorMsg && (
//           <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
//             {errorMsg}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
//                 placeholder="admin@wealth.io"
//               />
//             </div>
//             <div>
//               <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
//                 placeholder="••••••••"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-300">Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
//             >
//               <option value="SuperAdmin">Super Admin</option>
//               <option value="Admin">Admin</option>
//               <option value="RM">Relationship Manager</option>
//               <option value="Advisory">Advisor</option>
//               <option value="Operations">Operations</option>
//               <option value="Compliance">Compliance</option>
//               <option value="Security">Security</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-slate-500">
//           Need to deploy a new instance?{' '}
//           <Link to="/register" className="text-emerald-400 hover:text-emerald-300">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context.tsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrorMsg('');

    try {
<<<<<<< HEAD
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
=======
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
>>>>>>> 0dd0924b (changed frontend)

      const data = await response.json();

      if (response.ok && data.success) {
        login(
          data.user.role,
          data.user.full_name,
          data.user.email,
          data.user.employee_code,
          data.token
        );
<<<<<<< HEAD

        navigate('/dashboard');
      } else {
        setErrorMsg(
          data.message || 'Invalid credentials'
        );
      }
    } catch (err) {
      console.error(err);

=======
        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
>>>>>>> 0dd0924b (changed frontend)
      setErrorMsg('Server connection failed');
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-slate-950 text-gray-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">

        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
            Secure Access Portal
          </p>

          <h1 className="mt-4 text-3xl font-semibold text-white">
            Authenticate to the Unified Dashboard
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
=======
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
>>>>>>> 0dd0924b (changed frontend)
            Login using your registered email and password.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-mono">
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <div>
<<<<<<< HEAD
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

=======
              <label className="mb-2 block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                Email
              </label>
>>>>>>> 0dd0924b (changed frontend)
              <input
                type="email"
                required
                value={email}
<<<<<<< HEAD
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
=======
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-850 bg-gray-950 px-4 py-3 text-xs text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
>>>>>>> 0dd0924b (changed frontend)
                placeholder="admin@wealth.com"
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

=======
              <label className="mb-2 block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                Password
              </label>
>>>>>>> 0dd0924b (changed frontend)
              <input
                type="password"
                required
                value={password}
<<<<<<< HEAD
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
=======
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-850 bg-gray-950 px-4 py-3 text-xs text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
>>>>>>> 0dd0924b (changed frontend)
                placeholder="••••••••"
              />
            </div>

<<<<<<< HEAD
          </div>

=======
>>>>>>> 0dd0924b (changed frontend)
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/10 hover:opacity-90 transition font-mono"
          >
            Sign In
          </button>
        </form>
<<<<<<< HEAD
        <p className="mt-6 text-center text-sm text-slate-500">
          Need to deploy a new instance?{' '}
          <Link
            to="/register"
            className="text-emerald-400 hover:text-emerald-300"
          >
=======
        
        <p className="mt-6 text-center text-xs text-gray-500 font-mono">
          Need to deploy a new instance?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-350">
>>>>>>> 0dd0924b (changed frontend)
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}