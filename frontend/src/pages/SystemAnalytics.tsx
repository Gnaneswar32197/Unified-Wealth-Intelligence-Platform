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