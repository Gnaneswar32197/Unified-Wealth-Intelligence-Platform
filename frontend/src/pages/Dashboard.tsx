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



  return (

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

    </div>
  );
}