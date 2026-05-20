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
        setErrorMsg(
          data.message || 'Invalid credentials'
        );
      }
    } catch (err) {
      console.error(err);

      setErrorMsg('Server connection failed');
    }
  };

  return (
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
            Login using your registered email and password.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
                placeholder="admin@wealth.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-500"
                placeholder="••••••••"
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Need to deploy a new instance?{' '}
          <Link
            to="/register"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}