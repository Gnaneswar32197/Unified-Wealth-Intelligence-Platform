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

  FileText,

  BarChart3,

  Server,

  Settings

} from "lucide-react";



export default function Sidebar({

  setCurrentPage

}:any){



  return (

    <div
      className="
        w-[280px]
        min-h-screen
        bg-gray-950
        border-r
        border-gray-800
        p-6
      "
    >



      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">

          Wealth Platform

        </h1>

        <p className="text-emerald-400 mt-2">

          ADMIN PANEL

        </p>

      </div>



      <div className="space-y-4">



        <button
          onClick={() =>
            setCurrentPage(
              "dashboard"
            )
          }
          className="
            w-full
            flex
            items-center
            gap-4
            bg-emerald-500
            text-black
            px-5
            py-4
            rounded-2xl
            font-semibold
          "
        >

          <LayoutDashboard size={20} />

          Dashboard

        </button>



        <button
          onClick={() =>
            setCurrentPage(
              "users"
            )
          }
          className="
            w-full
            flex
            items-center
            gap-4
            text-white
            hover:bg-gray-900
            px-5
            py-4
            rounded-2xl
            transition
          "
        >

          <Users size={20} />

          User Management

        </button>



        <button
          onClick={() =>
            setCurrentPage(
              "audit"
            )
          }
          className="
            w-full
            flex
            items-center
            gap-4
            text-white
            hover:bg-gray-900
            px-5
            py-4
            rounded-2xl
            transition
          "
        >

          <FileText size={20} />

          Audit Logs

        </button>



        <button
          onClick={() =>
            setCurrentPage(
              "analytics"
            )
          }
          className="
            w-full
            flex
            items-center
            gap-4
            text-white
            hover:bg-gray-900
            px-5
            py-4
            rounded-2xl
            transition
          "
        >

          <BarChart3 size={20} />

          System Analytics

        </button>



        <button
          onClick={() =>
            setCurrentPage(
              "services"
            )
          }
          className="
            w-full
            flex
            items-center
            gap-4
            text-white
            hover:bg-gray-900
            px-5
            py-4
            rounded-2xl
            transition
          "
        >

          <Server size={20} />

          Service Monitoring

        </button>



        <button
          onClick={() =>
            setCurrentPage(
              "governance"
            )
          }
          className="
            w-full
            flex
            items-center
            gap-4
            text-white
            hover:bg-gray-900
            px-5
            py-4
            rounded-2xl
            transition
          "
        >

          <Settings size={20} />

          API Governance

        </button>

      </div>

    </div>
  );
}