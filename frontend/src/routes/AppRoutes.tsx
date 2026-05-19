import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context.tsx'; 

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar.tsx';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard.tsx';
import EquityDashboard from '../pages/EquityDashboard';
import MutualFundDashboard from '../pages/MutualFundDashboard';
import RealEstateDashboard from '../pages/RealEstateDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import RMDashboard from '../pages/RMDashboard';
import AdvisoryDashboard from '../pages/AdminDashboard.tsx';
import OperationsDashboard from '../pages/OperationsDashboard';
import ComplianceDashboard from '../pages/ComplianceDashboard';
import SecurityDashboard from '../pages/SecurityDashboard';
import Investors from '../pages/Investors';
import SIPMonitoring from '../pages/SIPMonitoring';
import ServiceHealth from '../pages/ServiceHealth';
import ApiMonitoring from '../pages/ApiMonitoring';
import Alerts from '../pages/Alerts';
import UserManagement from '../pages/UserManagement';
import RoleManagement from '../pages/RoleManagement';
import ServiceMonitoring from '../pages/ServiceMonitoring';
import AuditLogs from '../pages/AuditLogs';
import ApiGovernance from '../pages/ApiGovernance';
import SystemAnalytics from '../pages/SystemAnalytics';
import Settings from '../pages/Settings';

const DashboardLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Role Guard Component
const RoleGuard = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Dashboard Cluster */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/equity" element={<EquityDashboard />} />
          <Route path="/dashboard/mutual-funds" element={<MutualFundDashboard />} />
          <Route path="/dashboard/real-estate" element={<RealEstateDashboard />} />

          <Route path="/dashboard/investors" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<Investors />} />
          </Route>
          <Route path="/dashboard/sip-monitoring" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<SIPMonitoring />} />
          </Route>
          <Route path="/dashboard/service-health" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<ServiceHealth />} />
          </Route>
          <Route path="/dashboard/api-monitoring" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<ApiMonitoring />} />
          </Route>
          <Route path="/dashboard/alerts" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<Alerts />} />
          </Route>
          <Route path="/dashboard/audit-logs" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<AuditLogs />} />
          </Route>
          <Route path="/dashboard/users" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<UserManagement />} />
          </Route>
          <Route path="/dashboard/settings" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<Settings />} />
          </Route>
          <Route path="/dashboard/user-management" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<UserManagement />} />
          </Route>
          <Route path="/dashboard/role-management" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<RoleManagement />} />
          </Route>
          <Route path="/dashboard/service-monitoring" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<ServiceMonitoring />} />
          </Route>
          <Route path="/dashboard/api-governance" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<ApiGovernance />} />
          </Route>
          <Route path="/dashboard/system-analytics" element={<RoleGuard allowedRoles={['SuperAdmin']} />}>
            <Route index element={<SystemAnalytics />} />
          </Route>

          {/* Internal Professional/Staff Dashboards */}
          <Route path="/dashboard/admin" element={<RoleGuard allowedRoles={['Admin', 'SuperAdmin']} />}>
            <Route index element={<AdminDashboard />} />
          </Route>
          
          <Route path="/dashboard/rm" element={<RoleGuard allowedRoles={['Admin', 'RM', 'SuperAdmin']} />}>
            <Route index element={<RMDashboard />} />
          </Route>
          
          <Route path="/dashboard/advisory" element={<RoleGuard allowedRoles={['Admin', 'Advisory', 'SuperAdmin']} />}>
            <Route index element={<AdvisoryDashboard />} />
          </Route>
          
          <Route path="/dashboard/operations" element={<RoleGuard allowedRoles={['Admin', 'Operations', 'SuperAdmin']} />}>
            <Route index element={<OperationsDashboard />} />
          </Route>
          
          <Route path="/dashboard/compliance" element={<RoleGuard allowedRoles={['Admin', 'Compliance', 'SuperAdmin']} />}>
            <Route index element={<ComplianceDashboard />} />
          </Route>
          
          <Route path="/dashboard/security" element={<RoleGuard allowedRoles={['Admin', 'Security', 'SuperAdmin']} />}>
            <Route index element={<SecurityDashboard />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}