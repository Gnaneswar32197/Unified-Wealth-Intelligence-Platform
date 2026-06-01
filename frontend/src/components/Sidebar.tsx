// // import {

// //   LayoutDashboard,

// //   Users,

// //   ShieldCheck,

// //   Activity,

// //   FileText,

// //   Settings,

// //   LineChart,

// //   Wallet,

// //   AlertTriangle,

// //   Server,

// //   BarChart3,

// //   Lock,

// //   Database

// // } from "lucide-react";

// // import {

// //   Link,

// //   useLocation

// // } from "react-router-dom";



// // export default function Sidebar(){



// //   const location =
// //   useLocation();



// //   const storedUser =
// //   localStorage.getItem(
// //     "wealth-user"
// //   );



// //   const user =
// //   storedUser
// //   ?
// //   JSON.parse(storedUser)
// //   :
// //   null;



// //   const role =
// //   user?.role;



// //   /* ==========================================
// //      ROLE MENUS
// //   ========================================== */

// //   const roleMenus:any = {



// //     /* ======================================
// //        ADMIN
// //     ====================================== */

// //     ADMIN:[

// //       {
// //         title:"Dashboard",
// //         path:"/dashboard",
// //         icon:LayoutDashboard
// //       },

// //       {
// //         title:"User Management",
// //         path:"/admin/users",
// //         icon:Users
// //       },

// //       {
// //         title:"Audit Logs",
// //         path:"/audit/logs",
// //         icon:FileText
// //       },

// //       {
// //         title:"System Analytics",
// //         path:"/system/analytics",
// //         icon:BarChart3
// //       },

// //       {
// //         title:"Service Monitoring",
// //         path:"/services",
// //         icon:Server
// //       },

// //       {
// //         title:"API Governance",
// //         path:"/api/governance",
// //         icon:Settings
// //       }
// //     ],



// //     /* ======================================
// //        RM
// //     ====================================== */

// //     RM:[

// //       {
// //         title:"RM Dashboard",
// //         path:"/dashboard/rm",
// //         icon:LayoutDashboard
// //       },

// //       {
// //         title:"Investors",
// //         path:"/investors",
// //         icon:Users
// //       },

// //       {
// //         title:"Portfolio",
// //         path:"/portfolio",
// //         icon:Wallet
// //       },

// //       {
// //         title:"Performance",
// //         path:"/rm/performance",
// //         icon:LineChart
// //       }
// //     ],



// //     /* ======================================
// //        ADVISOR
// //     ====================================== */

// //     ADVISOR:[

// //       {
// //         title:"Advisor Dashboard",
// //         path:"/dashboard/advisor",
// //         icon:LayoutDashboard
// //       },

// //       {
// //         title:"Analytics",
// //         path:"/advisor/analytics",
// //         icon:BarChart3
// //       },

// //       {
// //         title:"Diversification",
// //         path:"/advisor/diversification",
// //         icon:Database
// //       },

// //       {
// //         title:"Risk Analysis",
// //         path:"/advisor/risk-analysis",
// //         icon:AlertTriangle
// //       },

// //       {
// //         title:"Recommendations",
// //         path:"/advisor/recommendations",
// //         icon:LineChart
// //       }
// //     ],



// //     /* ======================================
// //        OPERATIONS
// //     ====================================== */

// //     OPERATIONS:[

// //       {
// //         title:"Operations Dashboard",
// //         path:"/dashboard/operations",
// //         icon:LayoutDashboard
// //       },

// //       {
// //         title:"Failed SIPs",
// //         path:"/operations/failed-sips",
// //         icon:AlertTriangle
// //       },

// //       {
// //         title:"Inactive Investors",
// //         path:"/operations/inactive-investors",
// //         icon:Users
// //       },

// //       {
// //         title:"Service Failures",
// //         path:"/operations/service-failures",
// //         icon:Server
// //       },

// //       {
// //         title:"Reconciliation",
// //         path:"/operations/reconciliation",
// //         icon:Database
// //       }
// //     ],



// //     /* ======================================
// //        COMPLIANCE
// //     ====================================== */

// //     COMPLIANCE:[

// //       {
// //         title:"Compliance Dashboard",
// //         path:"/dashboard/compliance",
// //         icon:LayoutDashboard
// //       },

// //       {
// //         title:"Reports",
// //         path:"/compliance/reports",
// //         icon:FileText
// //       },

// //       {
// //         title:"Access Logs",
// //         path:"/compliance/access-logs",
// //         icon:ShieldCheck
// //       },

// //       {
// //         title:"Activity Logs",
// //         path:"/compliance/activity-logs",
// //         icon:Activity
// //       }
// //     ],



// //     /* ======================================
// //        SECURITY
// //     ====================================== */

// //     SECURITY:[

// //       {
// //         title:"Security Dashboard",
// //         path:"/dashboard/security",
// //         icon:LayoutDashboard
// //       },

// //       {
// //         title:"Security Logins",
// //         path:"/security/logins",
// //         icon:ShieldCheck
// //       },

// //       {
// //         title:"Sessions",
// //         path:"/security/sessions",
// //         icon:Users
// //       },

// //       {
// //         title:"Failed Attempts",
// //         path:"/security/failed-attempts",
// //         icon:AlertTriangle
// //       },

// //       {
// //         title:"Token Activity",
// //         path:"/security/token-activity",
// //         icon:Lock
// //       }
// //     ]
// //   };



// //   const menus =
// //   roleMenus[role] || [];



// //   return (

// //     <div
// //       className="
// //         w-[280px]
// //         min-h-screen
// //         bg-gray-950
// //         border-r
// //         border-gray-800
// //         p-6
// //       "
// //     >



// //       {/* ======================================
// //          LOGO
// //       ====================================== */}

// //       <div className="mb-10">

// //         <h1 className="text-3xl font-bold text-white">

// //           Wealth Platform

// //         </h1>

// //         <p className="text-emerald-400 text-sm mt-2">

// //           {role} PANEL

// //         </p>

// //       </div>



// //       {/* ======================================
// //          MENUS
// //       ====================================== */}

// //       <div className="space-y-3">

// //         {
// //           menus.map((menu:any,index:number) => {

// //             const Icon =
// //             menu.icon;



// //             const active =
// //             location.pathname ===
// //             menu.path;



// //             return (

// //               <Link
// //                 key={index}
// //                 to={menu.path}
// //                 className={`
// //                   flex
// //                   items-center
// //                   gap-4
// //                   px-4
// //                   py-4
// //                   rounded-2xl
// //                   transition-all
// //                   duration-300

// //                   ${
// //                     active
// //                     ?
// //                     "bg-emerald-500 text-black shadow-lg"
// //                     :
// //                     "text-gray-400 hover:bg-gray-900 hover:text-white"
// //                   }
// //                 `}
// //               >

// //                 <Icon size={20} />

// //                 <span className="font-medium">

// //                   {menu.title}

// //                 </span>

// //               </Link>
// //             );
// //           })
// //         }

// //       </div>

// //     </div>
// //   );
// // }

// import {

//   LayoutDashboard,

//   Users,

//   ShieldCheck,

//   Activity,

//   FileText,

//   Settings,

//   LineChart,

//   Wallet,

//   AlertTriangle,

//   Server,

//   BarChart3,

//   Lock,

//   Database

// } from "lucide-react";



// import {

//   Link,

//   useLocation

// } from "react-router-dom";



// export default function Sidebar(){



//   /* =====================================
//      SAFE USER PARSE
//   ===================================== */

//   let user:any = {};



//   try {

//     const storedUser =
//     localStorage.getItem(
//       "wealth-user"
//     );



//     user =
//     storedUser
//     ?
//     JSON.parse(storedUser)
//     :
//     {};

//   } catch(error){

//     console.log(error);

//     user = {};
//   }



//   const role =
//   user?.role;



//   const location =
//   useLocation();



//   /* =====================================
//      ROLE MENUS
//   ===================================== */

//   const roleMenus:any = {



//     ADMIN:[

//       {
//         title:"Dashboard",
//         path:"/dashboard",
//         icon:LayoutDashboard
//       },

//       {
//         title:"User Management",
//         path:"/users",
//         icon:Users
//       },

//       {
//         title:"Audit Logs",
//         path:"/audit/logs",
//         icon:FileText
//       },

//       {
//         title:"System Analytics",
//         path:"/system/analytics",
//         icon:BarChart3
//       },

//       {
//         title:"Service Monitoring",
//         path:"/services",
//         icon:Server
//       },

//       {
//         title:"API Governance",
//         path:"/api/governance",
//         icon:Settings
//       }
//     ],



//     RM:[

//       {
//         title:"RM Dashboard",
//         path:"/dashboard/rm",
//         icon:LayoutDashboard
//       },

//       {
//         title:"Investors",
//         path:"/investors",
//         icon:Users
//       },

//       {
//         title:"Portfolio",
//         path:"/portfolio",
//         icon:Wallet
//       },

//       {
//         title:"Performance",
//         path:"/rm/performance",
//         icon:LineChart
//       }
//     ],



//     ADVISOR:[

//       {
//         title:"Advisor Dashboard",
//         path:"/dashboard/advisor",
//         icon:LayoutDashboard
//       },

//       {
//         title:"Analytics",
//         path:"/advisor/analytics",
//         icon:BarChart3
//       },

//       {
//         title:"Diversification",
//         path:"/advisor/diversification",
//         icon:Database
//       },

//       {
//         title:"Risk Analysis",
//         path:"/advisor/risk-analysis",
//         icon:AlertTriangle
//       },

//       {
//         title:"Recommendations",
//         path:"/advisor/recommendations",
//         icon:LineChart
//       }
//     ],



//     OPERATIONS:[

//       {
//         title:"Operations Dashboard",
//         path:"/dashboard/operations",
//         icon:LayoutDashboard
//       },

//       {
//         title:"Failed SIPs",
//         path:"/operations/failed-sips",
//         icon:AlertTriangle
//       },

//       {
//         title:"Inactive Investors",
//         path:"/operations/inactive-investors",
//         icon:Users
//       },

//       {
//         title:"Service Failures",
//         path:"/operations/service-failures",
//         icon:Server
//       },

//       {
//         title:"Reconciliation",
//         path:"/operations/reconciliation",
//         icon:Database
//       }
//     ],



//     COMPLIANCE:[

//       {
//         title:"Compliance Dashboard",
//         path:"/dashboard/compliance",
//         icon:LayoutDashboard
//       },

//       {
//         title:"Reports",
//         path:"/compliance/reports",
//         icon:FileText
//       },

//       {
//         title:"Access Logs",
//         path:"/compliance/access-logs",
//         icon:ShieldCheck
//       },

//       {
//         title:"Activity Logs",
//         path:"/compliance/activity-logs",
//         icon:Activity
//       }
//     ],



//     SECURITY:[

//       {
//         title:"Security Dashboard",
//         path:"/dashboard/security",
//         icon:LayoutDashboard
//       },

//       {
//         title:"Security Logins",
//         path:"/security/logins",
//         icon:ShieldCheck
//       },

//       {
//         title:"Sessions",
//         path:"/security/sessions",
//         icon:Users
//       },

//       {
//         title:"Failed Attempts",
//         path:"/security/failed-attempts",
//         icon:AlertTriangle
//       },

//       {
//         title:"Token Activity",
//         path:"/security/token-activity",
//         icon:Lock
//       }
//     ]
//   };



//   const menus =
//   roleMenus[role] || [];



//   return (

//     <div
//       className="
//         w-[280px]
//         min-h-screen
//         bg-gray-950
//         border-r
//         border-gray-800
//         p-6
//       "
//     >



//       {/* =================================
//          LOGO
//       ================================= */}

//       <div className="mb-10">

//         <h1 className="text-3xl font-bold text-white">

//           Wealth Platform

//         </h1>

//         <p className="text-sm text-emerald-400 mt-2">

//           {role || "NO ROLE"} PANEL

//         </p>

//       </div>



//       {/* =================================
//          MENUS
//       ================================= */}

//       <div className="space-y-3">

//         {
//           menus.map((menu:any,index:number) => {

//             const Icon =
//             menu.icon;



//             const active =
//             location.pathname ===
//             menu.path;



//             return (

//               <Link
//                 key={index}
//                 to={menu.path}
//                 className={`
//                   flex
//                   items-center
//                   gap-4
//                   px-4
//                   py-4
//                   rounded-2xl
//                   transition-all
//                   duration-300

//                   ${
//                     active
//                     ?
//                     "bg-emerald-500 text-black shadow-lg"
//                     :
//                     "text-gray-400 hover:bg-gray-900 hover:text-white"
//                   }
//                 `}
//               >

//                 <Icon size={20} />

//                 <span className="font-medium">

//                   {menu.title}

//                 </span>

//               </Link>
//             );
//           })
//         }

//       </div>

//     </div>
//   );
// }
import {

  LayoutDashboard,

  Users,
  Activity,
  Building,
  HeartPulse,
  ServerCog,
  Bell,
  FileSearch,
  UserPlus,
  Settings2,
  KeyRound,
  ShieldCheck,
  BarChart3,
  Database,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context.tsx';


const makeLinkClass = (currentPath: string, path: string) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
    currentPath === path ? 'bg-emerald-600/10 text-emerald-400' : 'text-slate-400 hover:text-emerald-300'
  }`;

export default function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const currentPath = location.pathname;

  const mainLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const superAdminLinks = [
    { to: '/dashboard/investors', label: 'Investors', icon: Users },
    { to: '/dashboard/sip-monitoring', label: 'SIP Monitoring', icon: Activity },
    { to: '/dashboard/real-estate', label: 'Real Estate', icon: Building },
    { to: '/dashboard/service-health', label: 'Service Health', icon: HeartPulse },
    { to: '/dashboard/api-monitoring', label: 'API Monitoring', icon: ServerCog },
    { to: '/dashboard/alerts', label: 'Alerts', icon: Bell },
    { to: '/dashboard/audit-logs', label: 'Audit Logs', icon: FileSearch },
    { to: '/dashboard/users', label: 'Users', icon: UserPlus },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings2 },
  ];

  const superAdminTools = [
    { to: '/dashboard/user-management', label: 'User Management', icon: Users },
    { to: '/dashboard/role-management', label: 'Role Management', icon: KeyRound },
    { to: '/dashboard/service-monitoring', label: 'Service Monitoring', icon: Database },
    { to: '/dashboard/api-governance', label: 'API Governance', icon: ShieldCheck },
    { to: '/dashboard/system-analytics', label: 'System Analytics', icon: BarChart3 },
  ];

  const adminLinks = [
    { to: '/dashboard/admin', label: 'Admin Dashboard', icon: ShieldCheck },
  ];

  return (
    <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col justify-between h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">W</div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Super Admin</p>
            <p className="text-xs text-slate-500">Platform controller</p>
          </div>
        </div>

        <nav className="space-y-1">
          {mainLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}

          {adminLinks.map((item) => {
            if (!['Admin', 'SuperAdmin'].includes(user?.role || '')) return null;
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}

          {/* Operational Roles Section */}
          {['RM', 'Advisory', 'Operations', 'Compliance', 'Security', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
            <>
              <div className="mt-6 mb-2 px-4 text-xs uppercase tracking-[0.28em] text-slate-500">Operational Desks</div>
              {['RM', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/rm" className={makeLinkClass(currentPath, '/dashboard/rm')}>
                  <Users size={18} />
                  RM Client Book
                </Link>
              )}
              {['Advisory', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/advisory" className={makeLinkClass(currentPath, '/dashboard/advisory')}>
                  <BarChart3 size={18} />
                  Advisory Panel
                </Link>
              )}
              {['Operations', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/operations" className={makeLinkClass(currentPath, '/dashboard/operations')}>
                  <ServerCog size={18} />
                  Operations Desk
                </Link>
              )}
              {['Compliance', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/compliance" className={makeLinkClass(currentPath, '/dashboard/compliance')}>
                  <FileSearch size={18} />
                  Compliance Reports
                </Link>
              )}
              {['Security', 'Admin', 'SuperAdmin'].includes(user?.role || '') && (
                <Link to="/dashboard/security" className={makeLinkClass(currentPath, '/dashboard/security')}>
                  <ShieldCheck size={18} />
                  Security Center
                </Link>
              )}
            </>
          )}

          {user?.role === 'SuperAdmin' && (
            <>
              <div className="mt-6 mb-2 px-4 text-xs uppercase tracking-[0.28em] text-slate-500">Super Admin Controls</div>
              {superAdminLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-6 mb-2 px-4 text-xs uppercase tracking-[0.28em] text-slate-500">Platform Operations</div>
              {superAdminTools.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.to} to={item.to} className={makeLinkClass(currentPath, item.to)}>
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          <LogOut size={18} />
          Terminate Session
        </button>
      </div>

    </aside>
  );
}