import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";



import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

import UserManagement from "./pages/UserManagement";

import AuditLogs from "./pages/AuditLogs";

import SystemAnalytics from "./pages/SystemAnalytics";

import ServiceMonitoring from "./pages/ServiceMonitoring";

import ApiGovernance from "./pages/ApiGovernance";



import MainLayout from "./layouts/MainLayout";



export default function AppRoutes(){



  return (

    <BrowserRouter>

      <Routes>



        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />



        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />



        {/* USER MANAGEMENT */}

        <Route
          path="/admin/users"
          element={
            <MainLayout>
              <UserManagement />
            </MainLayout>
          }
        />



        {/* AUDIT LOGS */}

        <Route
          path="/audit/logs"
          element={
            <MainLayout>
              <AuditLogs />
            </MainLayout>
          }
        />



        {/* ANALYTICS */}

        <Route
          path="/system/analytics"
          element={
            <MainLayout>
              <SystemAnalytics />
            </MainLayout>
          }
        />



        {/* SERVICES */}

        <Route
          path="/services"
          element={
            <MainLayout>
              <ServiceMonitoring />
            </MainLayout>
          }
        />



        {/* API GOVERNANCE */}

        <Route
          path="/api/governance"
          element={
            <MainLayout>
              <ApiGovernance />
            </MainLayout>
          }
        />



        {/* DEFAULT */}

        <Route
          path="*"
          element={
            <Navigate to="/dashboard" />
          }
        />



      </Routes>

    </BrowserRouter>
  );
}