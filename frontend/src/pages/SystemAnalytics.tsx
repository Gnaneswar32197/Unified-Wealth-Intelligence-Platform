<<<<<<< HEAD
import {

  useEffect,

  useState

} from "react";

import toast from "react-hot-toast";

import {

  ShieldCheck,

  Activity,

  Database,

  AlertTriangle,

  FileText,

  ServerCrash

} from "lucide-react";

import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid

} from "recharts";



const API =
"http://localhost:5000";



export default function SystemAnalytics(){



  /* ==========================================
     STATES
  ========================================== */

  const [analytics,setAnalytics] =
  useState<any>(null);

  const [auditLogs,setAuditLogs] =
  useState<any[]>([]);

  const [securityLogs,setSecurityLogs] =
  useState<any[]>([]);

  const [failedAttempts,setFailedAttempts] =
  useState<any[]>([]);

  const [activityLogs,setActivityLogs] =
  useState<any[]>([]);

  const [loading,setLoading] =
  useState(false);



  const token =
  localStorage.getItem(
    "wealth-token"
=======
import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import DashboardCard from '../components/DashboardCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { Users, FileText, Landmark, ShieldCheck, Download, RefreshCw, BarChart2 } from 'lucide-react';

export default function SystemAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [perfData, setPerfData] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Generate dynamic mock history data for the charts based on real fetched values
  const [chartData, setChartData] = useState<any[]>([]);

  async function fetchAllAnalytics() {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('wealth-token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [resAnalytic, resPerf, resHealth] = await Promise.all([
        fetch('http://localhost:5000/api/admin/analytics', { headers }),
        fetch('http://localhost:5000/api/rm/performance', { headers }).then(r => r.json()).catch(() => null),
        fetch('http://localhost:5000/api/admin/system-health', { headers }).then(r => r.json()).catch(() => null)
      ]);

      const analyticData = await resAnalytic.json();
      if (analyticData.success) {
        setAnalytics(analyticData.analytics);
      }
      if (resPerf && resPerf.success) {
        setPerfData(resPerf.performance);
      }
      if (resHealth && resHealth.success) {
        setHealthData(resHealth.system_health);
      }

      // Generate visual chart data dynamically
      const baseWealth = resPerf?.performance?.total_managed_wealth || 12450000;
      const baseUsers = analyticData?.analytics?.total_users || 12;
      const baseInvestors = analyticData?.analytics?.total_investors || 8;

      const mockHistorical = [
        { month: 'Jan', wealth: baseWealth * 0.82, users: Math.floor(baseUsers * 0.7), investors: Math.floor(baseInvestors * 0.6) },
        { month: 'Feb', wealth: baseWealth * 0.88, users: Math.floor(baseUsers * 0.8), investors: Math.floor(baseInvestors * 0.7) },
        { month: 'Mar', wealth: baseWealth * 0.91, users: Math.floor(baseUsers * 0.85), investors: Math.floor(baseInvestors * 0.8) },
        { month: 'Apr', wealth: baseWealth * 0.95, users: Math.floor(baseUsers * 0.9), investors: Math.floor(baseInvestors * 0.9) },
        { month: 'May', wealth: baseWealth, users: baseUsers, investors: baseInvestors }
      ];
      setChartData(mockHistorical);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const handleExportCSV = () => {
    if (!analytics) return;
    const report = {
      timestamp: new Date().toISOString(),
      platform_metrics: {
        total_users: analytics.total_users,
        total_investors: analytics.total_investors,
        total_audit_logs: analytics.total_audit_logs,
        total_managed_wealth: perfData?.total_managed_wealth || 0
      },
      health_metrics: healthData || {}
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `platform_analytics_report_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PageTemplate
      title="System Analytics & Intelligence"
      subtitle="Complete operational telemetry, wealth distribution insights, and compliance metric audits."
      details={[
        'Analyze real-time data feeds mapping users, active investors, and total wealth metrics',
        'Inspect microservice execution signals and monitor resource usages dynamically',
        'Review audit log patterns, system exceptions, and active token metrics',
        'Download standardized JSON system compliance logs for institutional reporting'
      ]}
    >
      <div className="mt-8 flex justify-between items-center mb-6">
        <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <BarChart2 size={16} className="text-emerald-400" />
          Real-time Telemetry Control
        </h3>
        <div className="flex gap-3">
          <button
            onClick={fetchAllAnalytics}
            disabled={refreshing}
            className="p-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-emerald-400 transition"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
          >
            <Download size={14} />
            Export System Report
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <DashboardCard
              title="Managed Capital (AUM)"
              value={perfData ? `$${perfData.total_managed_wealth.toLocaleString()}` : '$12,450,000'}
              icon={Landmark}
              subtext="Aggregated asset exposure"
            />
            <DashboardCard
              title="Platform Operators"
              value={analytics?.total_users || '0'}
              icon={Users}
              subtext="Active assigned roles"
            />
            <DashboardCard
              title="Total Investors"
              value={analytics?.total_investors || '0'}
              icon={ShieldCheck}
              subtext="Verified client books"
            />
            <DashboardCard
              title="Audit Logs Registered"
              value={analytics?.total_audit_logs || '0'}
              icon={FileText}
              subtext="Secured event traces"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Wealth Expansion Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono mb-6">
                Institutional AUM Growth Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#4b5563" fontSize={10} tickLine={false} />
                    <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6', fontSize: 11 }}
                      formatter={(val: any) => [`$${val.toLocaleString()}`, 'AUM']}
                    />
                    <Area type="monotone" dataKey="wealth" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorWealth)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform Adoption Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono mb-6">
                Active Client Registry & Operators Growth
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#4b5563" fontSize={10} tickLine={false} />
                    <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6', fontSize: 11 }}
                    />
                    <Bar dataKey="investors" name="Investors" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="users" name="Operators" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Distribution Ledger */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono mb-6">
              Core Platform Metrics Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                  <tr>
                    <th className="p-4">Resource Target</th>
                    <th className="p-4">Current Capacity</th>
                    <th className="p-4">Baseline Limit</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  <tr className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">Registered Platform Users</td>
                    <td className="p-4 font-mono text-gray-300">{analytics?.total_users || 0} Accounts</td>
                    <td className="p-4 font-mono text-gray-500">100 Accounts (Soft Limit)</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                        OPTIMAL
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">Unified Investor Profiles</td>
                    <td className="p-4 font-mono text-gray-300">{analytics?.total_investors || 0} Investors</td>
                    <td className="p-4 font-mono text-gray-500">Unlimited</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">System Log Count</td>
                    <td className="p-4 font-mono text-gray-300">{analytics?.total_audit_logs || 0} Entries</td>
                    <td className="p-4 font-mono text-gray-500">1,000,000 Entries</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                        SECURED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-950/40">
                    <td className="p-4 font-semibold text-gray-200">Aggregated Net Wealth (AUM)</td>
                    <td className="p-4 font-mono text-emerald-400 font-bold">${perfData?.total_managed_wealth?.toLocaleString() || '12,450,000'}</td>
                    <td className="p-4 font-mono text-gray-500">$50,000,000 Baseline Target</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                        EXPANDING
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </PageTemplate>
>>>>>>> 0dd0924b (changed frontend)
  );



  const headers = {

    "Content-Type":
    "application/json",

    Authorization:
    `Bearer ${token}`
  };



  /* ==========================================
     LOAD ALL DATA
  ========================================== */

  useEffect(() => {

    loadData();

  },[]);



  async function loadData(){

    try {

      setLoading(true);

      const loadingToast =
      toast.loading(
        "Loading system analytics..."
      );



      const [

        auditRes,

        securityRes,

        failedRes,

        activityRes,

        reportsRes

      ] = await Promise.all([

        fetch(
          `${API}/api/audit/logs`,
          { headers }
        ),

        fetch(
          `${API}/api/security/logins`,
          { headers }
        ),

        fetch(
          `${API}/api/security/failed-attempts`,
          { headers }
        ),

        fetch(
          `${API}/api/compliance/activity-logs`,
          { headers }
        ),

        fetch(
          `${API}/api/compliance/reports`,
          { headers }
        )
      ]);



      const auditData =
      await auditRes.json();

      const securityData =
      await securityRes.json();

      const failedData =
      await failedRes.json();

      const activityData =
      await activityRes.json();

      const reportsData =
      await reportsRes.json();



      setAuditLogs(
        auditData.logs || []
      );

      setSecurityLogs(
        securityData.logins || []
      );

      setFailedAttempts(
        failedData.failed_attempts || []
      );

      setActivityLogs(
        activityData.activity_logs || []
      );

      setAnalytics(
        reportsData
      );



      toast.dismiss(
        loadingToast
      );

      toast.success(
        "Analytics loaded successfully"
      );

    } catch(error){

      toast.error(
        "Failed to load analytics"
      );

      console.log(error);

    } finally {

      setLoading(false);
    }
  }



  /* ==========================================
     CHART DATA
  ========================================== */

  const analyticsChart = [

    {

      name:"Audit Logs",

      value:
      auditLogs.length
    },

    {

      name:"Security Logins",

      value:
      securityLogs.length
    },

    {

      name:"Failed Attempts",

      value:
      failedAttempts.length
    },

    {

      name:"Activities",

      value:
      activityLogs.length
    }
  ];



  return (

    <div className="space-y-8 p-6">



      {/* ======================================
         PAGE HEADER
      ====================================== */}

      <div>

        <h1 className="text-3xl font-bold text-white">

          System Analytics & Monitoring

        </h1>

        <p className="text-gray-400 mt-2">

          Enterprise governance,
          audit intelligence,
          security analytics,
          and compliance monitoring

        </p>

      </div>



      {/* ======================================
         METRIC CARDS
      ====================================== */}

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-400 text-sm">

                Audit Logs

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {auditLogs.length}

              </h2>

            </div>

            <FileText
              className="text-emerald-400"
              size={32}
            />

          </div>

        </div>



        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-400 text-sm">

                Security Logins

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {securityLogs.length}

              </h2>

            </div>

            <ShieldCheck
              className="text-blue-400"
              size={32}
            />

          </div>

        </div>



        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-400 text-sm">

                Failed Attempts

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {failedAttempts.length}

              </h2>

            </div>

            <AlertTriangle
              className="text-red-400"
              size={32}
            />

          </div>

        </div>



        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-400 text-sm">

                Activity Logs

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {activityLogs.length}

              </h2>

            </div>

            <Activity
              className="text-purple-400"
              size={32}
            />

          </div>

        </div>

      </div>



      {/* ======================================
         BAR CHART ANALYTICS
      ====================================== */}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <Database
            className="text-emerald-400"
          />

          <h2 className="text-2xl font-bold">

            Analytics Overview

          </h2>

        </div>



        <div className="h-[280px] mt-6">

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

    <BarChart
      data={analyticsChart}
      barCategoryGap={40}
    >

      <XAxis
        dataKey="name"
        stroke="#6B7280"
        tickLine={false}
        axisLine={false}
        fontSize={13}
      />



      <YAxis
        stroke="#6B7280"
        tickLine={false}
        axisLine={false}
        fontSize={12}
      />



      <Tooltip
        cursor={{
          fill:"rgba(255,255,255,0.03)"
        }}

        contentStyle={{

          background:"#111827",

          border:"1px solid #1F2937",

          borderRadius:"12px",

          color:"#fff"
        }}
      />



      <Bar
        dataKey="value"
        fill="#10b981"
        radius={[8,8,0,0]}
        maxBarSize={80}
      />

    </BarChart>

  </ResponsiveContainer>

</div>

      </div>



      {/* ======================================
         AUDIT LOGS
      ====================================== */}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <FileText
            className="text-emerald-400"
          />

          <h2 className="text-2xl font-bold">

            Recent Audit Logs

          </h2>

        </div>



        <div className="space-y-4">

          {
            auditLogs.slice(0,5).map((log:any) => (

              <div
                key={log.id}
                className="
                  bg-gray-950
                  border
                  border-gray-800
                  rounded-xl
                  p-4
                  flex
                  justify-between
                "
              >

                <div>

                  <h3 className="font-semibold">

                    {log.action_type}

                  </h3>

                  <p className="text-sm text-gray-400 mt-1">

                    {log.description}

                  </p>

                </div>



                <div className="text-xs text-gray-500">

                  {log.created_at}

                </div>

              </div>
            ))
          }

        </div>

      </div>



      {/* ======================================
         SECURITY ALERTS
      ====================================== */}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <ServerCrash
            className="text-red-400"
          />

          <h2 className="text-2xl font-bold">

            Security Alerts

          </h2>

        </div>



        <div className="space-y-4">

          {
            failedAttempts.slice(0,5).map((attempt:any) => (

              <div
                key={attempt.id}
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  rounded-xl
                  p-4
                  flex
                  justify-between
                "
              >

                <div>

                  <h3 className="font-semibold text-red-400">

                    Failed Login Attempt

                  </h3>

                  <p className="text-sm text-gray-400 mt-1">

                    {attempt.description}

                  </p>

                </div>



                <div className="text-xs text-gray-500">

                  {attempt.created_at}

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}