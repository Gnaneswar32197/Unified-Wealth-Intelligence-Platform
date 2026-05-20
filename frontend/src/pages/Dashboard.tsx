<<<<<<< HEAD
import {

  useEffect,

  useState

} from "react";

import DashboardCard
from "../components/DashboardCard";

import {

  Wallet,

  Users,

  ShieldCheck,

  Activity

} from "lucide-react";

import {

  fetchAdminAnalytics,

  fetchSystemHealth

} from "../services/adminApi";



export default function AdminDashboard(){

  const [analytics,setAnalytics] =
  useState<any>(null);

  const [health,setHealth] =
  useState<any>(null);



  useEffect(() => {

    loadData();

  },[]);



  async function loadData(){

    try {

      const analyticsData =
      await fetchAdminAnalytics();

      const healthData =
      await fetchSystemHealth();

      setAnalytics(
        analyticsData
      );

      setHealth(
        healthData
      );

    } catch(error){

      console.log(error);
    }
  }


=======
import { useState, useEffect } from 'react';
import { useAuth } from '../context.tsx';
import { Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Bell, Info, ArrowUpRight, ArrowDownRight, DollarSign, Wallet, RefreshCw as ResetIcon } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fallback check to redirect non-admin roles
  if (user && !['Admin', 'SuperAdmin'].includes(user.role)) {
    if (user.role === 'RM') return <Navigate to="/dashboard/rm" replace />;
    if (user.role === 'Advisory') return <Navigate to="/dashboard/advisory" replace />;
    if (user.role === 'Operations') return <Navigate to="/dashboard/operations" replace />;
    if (user.role === 'Compliance') return <Navigate to="/dashboard/compliance" replace />;
    if (user.role === 'Security') return <Navigate to="/dashboard/security" replace />;
  }

  // Generate Comparison data for the Bar Chart matching Jan - Oct structure
  const barChartData = [
    { name: 'Jan', Limit: 6000, Spend: 4500 },
    { name: 'Feb', Limit: 5500, Spend: 3800 },
    { name: 'Mar', Limit: 7000, Spend: 5200 },
    { name: 'Apr', Limit: 8200, Spend: 9000 },
    { name: 'May', Limit: 6500, Spend: 4800 },
    { name: 'Jun', Limit: 7800, Spend: 6000 },
    { name: 'Jul', Limit: 8500, Spend: 7200 },
    { name: 'Aug', Limit: 6200, Spend: 5100 },
    { name: 'Sep', Limit: 7100, Spend: 5800 },
    { name: 'Oct', Limit: 6900, Spend: 5400 }
  ];

  async function fetchDashboardData() {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/rm/performance', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.performance);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);
>>>>>>> 0dd0924b (changed frontend)

  const handleResetData = () => {
    alert('Dashboard telemetry caches successfully recycled.');
    fetchDashboardData();
  };

  // SVG Gauge calculations
  const strokeWidth = 14;
  const radius = 80;
  const circ = Math.PI * radius; // Half-circle perimeter
  const percentage = 68; // 68% fill
  const strokeDashoffset = circ - (percentage / 100) * circ;

  return (
<<<<<<< HEAD

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Super Admin Dashboard
        </h1>

        <p className="text-gray-400">

          Enterprise Wealth Operations
        </p>
      </div>



      <div className="grid grid-cols-4 gap-6">

        <DashboardCard
          title="Platform Users"
          value={
            analytics?.total_users || 0
          }
          icon={Users}
          subtext="All active staff"
        />



        <DashboardCard
          title="Unified Investors"
          value={
            analytics?.total_investors || 0
          }
          icon={Wallet}
          subtext="Total onboarded investors"
        />



        <DashboardCard
          title="System Security"
          value="Protected"
          icon={ShieldCheck}
          subtext="JWT + RBAC active"
        />



        <DashboardCard
          title="Microservices"
          value={
            health?.active_services || 0
          }
          icon={Activity}
          subtext="Gateway + Equity + MF"
        />

      </div>

=======
    <div className="space-y-6 text-gray-200">
      {/* Top Header Strip matching the screenshot */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-900 pb-5">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <span className="hover:text-gray-300 cursor-pointer">Finance</span>
          <span>/</span>
          <span className="text-gray-300 font-semibold">Dashboard</span>
        </div>

        {/* Global Action Tools */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input
              type="text"
              placeholder="Global search"
              className="bg-gray-900/60 border border-gray-800 rounded-xl py-2 pl-9 pr-12 text-xs text-gray-200 placeholder-gray-500 outline-none w-full md:w-56 font-mono"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded font-bold font-mono">
              ⌘ F
            </span>
          </div>

          {/* Quick Notification icons */}
          <button className="p-2.5 bg-gray-900/60 border border-gray-850 hover:border-gray-800 text-gray-400 hover:text-emerald-400 rounded-xl transition">
            <Bell size={13} />
          </button>
          <button className="p-2.5 bg-gray-900/60 border border-gray-850 hover:border-gray-800 text-gray-400 hover:text-emerald-400 rounded-xl transition">
            <Info size={13} />
          </button>
        </div>
      </div>

      {/* Main Title Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-100">Overview</h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">This is the summary of the overall data.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-900 border border-gray-850 hover:border-gray-800 text-xs font-bold text-gray-300 rounded-xl font-mono transition">
            This Month ▾
          </button>
          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-gray-900 border border-gray-850 hover:border-gray-800 text-xs font-bold text-gray-300 rounded-xl font-mono flex items-center gap-1.5 transition"
          >
            <ResetIcon size={12} className={refreshing ? 'animate-spin' : ''} />
            Reset Data
          </button>
        </div>
      </div>

      {/* Upper Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 2x2 Metrics Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-gray-900 border border-gray-850 hover:border-gray-800 p-5 rounded-2xl flex flex-col justify-between h-36 transition-all duration-200">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Earnings</span>
              <span className="p-1.5 bg-gray-950 rounded-lg text-gray-500"><DollarSign size={12} /></span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-100 font-mono">$950</p>
              <span className="text-[10px] text-emerald-400 font-bold font-mono flex items-center gap-0.5 mt-1">
                <ArrowUpRight size={12} /> 7% <span className="text-gray-500 font-medium">This month</span>
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 border border-gray-850 hover:border-gray-800 p-5 rounded-2xl flex flex-col justify-between h-36 transition-all duration-200">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Spending</span>
              <span className="p-1.5 bg-gray-950 rounded-lg text-gray-500"><Wallet size={12} /></span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-100 font-mono">$700</p>
              <span className="text-[10px] text-rose-400 font-bold font-mono flex items-center gap-0.5 mt-1">
                <ArrowDownRight size={12} /> 5% <span className="text-gray-500 font-medium">This month</span>
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 border border-gray-850 hover:border-gray-800 p-5 rounded-2xl flex flex-col justify-between h-36 transition-all duration-200">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Income</span>
              <span className="p-1.5 bg-gray-950 rounded-lg text-gray-500"><DollarSign size={12} /></span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-100 font-mono">$1,025</p>
              <span className="text-[10px] text-emerald-400 font-bold font-mono flex items-center gap-0.5 mt-1">
                <ArrowUpRight size={12} /> 8% <span className="text-gray-500 font-medium">This month</span>
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-900 border border-gray-850 hover:border-gray-800 p-5 rounded-2xl flex flex-col justify-between h-36 transition-all duration-200">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Revenue</span>
              <span className="p-1.5 bg-gray-950 rounded-lg text-gray-500"><DollarSign size={12} /></span>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-100 font-mono">$775</p>
              <span className="text-[10px] text-emerald-400 font-bold font-mono flex items-center gap-0.5 mt-1">
                <ArrowUpRight size={12} /> 4% <span className="text-gray-500 font-medium">This month</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Total Balance Widget */}
        <div className="bg-gray-900 border border-gray-850 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Balance</span>
              <span className="text-[9px] bg-gray-950 border border-gray-850 text-gray-400 font-mono px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                🇺🇸 USD ▾
              </span>
            </div>
            <h2 className="text-3xl font-black text-gray-100 font-mono tracking-tight">
              ${stats ? stats.total_managed_wealth.toLocaleString() : '687,369.00'}
            </h2>
            <span className="text-[10px] text-emerald-400 font-bold font-mono flex items-center gap-0.5 mt-1">
              <ArrowUpRight size={12} /> 5% <span className="text-gray-500 font-medium">than this month</span>
            </span>
          </div>

          {/* Quick buttons */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <button className="py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/10 hover:opacity-90 font-mono transition">
              ⇆ Transfer
            </button>
            <button className="py-2.5 bg-gray-950 hover:bg-gray-900 text-gray-300 font-bold text-xs rounded-xl border border-gray-850 font-mono transition">
              ⇆ Request
            </button>
          </div>

          {/* Mini Wallets ledger */}
          <div className="border-t border-gray-850 pt-3 space-y-2">
            <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold font-mono">Wallets | Total 6 wallets</p>
            <div className="flex justify-between items-center bg-gray-950 p-2.5 rounded-xl border border-gray-850">
              <div>
                <p className="text-[10px] font-bold text-gray-200 font-mono">$21,567.00</p>
                <p className="text-[8px] text-emerald-400 font-semibold font-mono mt-0.5">Limit $10k a month</p>
              </div>
              <span className="text-[9px] bg-gray-900 border border-gray-850 text-gray-400 font-mono px-1.5 py-0.5 rounded">🇺🇸 USD</span>
            </div>
            <div className="flex justify-between items-center bg-gray-950 p-2.5 rounded-xl border border-gray-850">
              <div>
                <p className="text-[10px] font-bold text-gray-200 font-mono">€17,259.00</p>
                <p className="text-[8px] text-emerald-400 font-semibold font-mono mt-0.5">Limit €9k a month</p>
              </div>
              <span className="text-[9px] bg-gray-900 border border-gray-850 text-gray-400 font-mono px-1.5 py-0.5 rounded">🇪🇺 EUR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Semicircular Spend Limit Gauge */}
        <div className="bg-gray-900 border border-gray-850 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">Spending Limit</h3>
            </div>
            <button className="px-2.5 py-1 bg-gray-950 border border-gray-850 text-gray-400 text-[9px] font-mono rounded font-bold">
              Last 30 days
            </button>
          </div>

          <div className="flex flex-col items-center py-4 relative">
            <svg className="w-full h-32" viewBox="0 0 200 110">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#166534" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity={1} />
                </linearGradient>
              </defs>
              {/* Background Track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#1c1c1f"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Filled Track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute bottom-6 flex flex-col items-center">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono font-bold">SPEND</span>
              <span className="text-lg font-black font-mono text-gray-100 mt-0.5">$1,232.00</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-gray-850 pt-3">
            <span className="text-lg font-bold font-mono text-gray-100">$1232.00</span>
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-bold rounded font-mono">
              ↑ 3.5%
            </span>
          </div>
        </div>

        {/* Available Balance Comparison Bar Graph */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-850 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">Available Balance</h3>
              <h4 className="text-lg font-black font-mono text-gray-100 mt-1">$24,450.00</h4>
            </div>
            <button className="px-2.5 py-1 bg-gray-950 border border-gray-850 text-gray-400 text-[9px] font-mono rounded font-bold">
              Last 30 days
            </button>
          </div>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c0c0d', borderColor: '#232326', color: '#e4e4e7', fontSize: 10 }}
                />
                {/* Double bars showing limit vs actual spend */}
                <Bar dataKey="Limit" name="Budget Limit" fill="#e4e4e7" radius={[2, 2, 0, 0]} barSize={5} />
                <Bar dataKey="Spend" name="Current Spend" fill="#22c55e" radius={[2, 2, 0, 0]} barSize={5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activities */}
      <div className="bg-gray-900 border border-gray-850 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-5 border-b border-gray-850 flex flex-wrap justify-between items-center gap-4">
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">Recent Activities</h3>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={13} />
              <input
                type="text"
                placeholder="Search logs..."
                className="bg-gray-950 border border-gray-850 rounded-lg py-1.5 pl-8 pr-3 text-xs outline-none text-gray-300 font-mono"
              />
            </div>
            <button className="px-3 py-1.5 bg-gray-950 border border-gray-850 text-gray-400 hover:text-emerald-400 rounded-lg text-xs font-mono font-bold transition">
              ▾ Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-gray-500 bg-gray-950/60 uppercase border-b border-gray-850 font-mono text-[9px] tracking-wider">
              <tr>
                <th className="p-4">Activity</th>
                <th className="p-4">Reference Code</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-850">
              <tr className="hover:bg-gray-950/20">
                <td className="p-4 font-semibold text-gray-200">System Capital Reconciliation</td>
                <td className="p-4 font-mono text-gray-500">#RECON_893A2</td>
                <td className="p-4 text-gray-400 font-mono">May 20, 2026 14:02</td>
                <td className="p-4 font-mono text-emerald-400 font-bold">+$124,500.00</td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                    Success
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-950/20">
                <td className="p-4 font-semibold text-gray-200">Equity Pool Trade Sync</td>
                <td className="p-4 font-mono text-gray-500">#TRADE_0923L</td>
                <td className="p-4 text-gray-400 font-mono">May 20, 2026 13:58</td>
                <td className="p-4 font-mono text-rose-400 font-bold">-$45,000.00</td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                    Success
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-950/20">
                <td className="p-4 font-semibold text-gray-200">Client Advisory Report Dispatch</td>
                <td className="p-4 font-mono text-gray-500">#REPT_5628K</td>
                <td className="p-4 text-gray-400 font-mono">May 20, 2026 13:12</td>
                <td className="p-4 font-mono text-gray-400">--</td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                    Dispatched
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
>>>>>>> 0dd0924b (changed frontend)
    </div>
  );
}