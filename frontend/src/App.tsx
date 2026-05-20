
// // import { useState } from "react";

// // import { Toaster } from "react-hot-toast";

// // import AppRoutes from "./routes/AppRoutes";

// // import {

// //   AuthContext,

// //   type User

// // } from "./context";



// // export default function App(){



// //   /* ==========================================
// //      USER STATE
// //   ========================================== */

// //   const [user,setUser] =
// //   useState<User | null>(() => {

// //     const saved =
// //     localStorage.getItem(
// //       "wealth-user"
// //     );

// //     return saved
// //       ?
// //       JSON.parse(saved)
// //       :
// //       null;
// //   });



// //   /* ==========================================
// //      LOGIN
// //   ========================================== */

// //   const login = (

// //     role:string,

// //     name?:string,

// //     email?:string,

// //     employee_code?:string,

// //     token?:string

// //   ) => {



// //     const newUser = {

// //       name:name || "",

// //       role:role,

// //       email:email || "",

// //       employee_code:
// //       employee_code || "",

// //       token:token || ""
// //     };



// //     if(token){

// //       localStorage.setItem(

// //         "wealth-token",

// //         token
// //       );
// //     }



// //     localStorage.setItem(

// //       "wealth-user",

// //       JSON.stringify(newUser)
// //     );



// //     setUser(newUser);
// //   };



// //   /* ==========================================
// //      LOGOUT
// //   ========================================== */

// //   const logout = () => {

// //     localStorage.removeItem(
// //       "wealth-user"
// //     );

// //     localStorage.removeItem(
// //       "wealth-token"
// //     );

// //     setUser(null);
// //   };



// //   return (

// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         login,
// //         logout
// //       }}
// //     >



// //       {/* ======================================
// //          GLOBAL TOASTS
// //       ====================================== */}

// //       <Toaster

// //         position="top-right"

// //         reverseOrder={false}

// //         toastOptions={{

// //           duration:3000,

// //           style:{

// //             background:"#111827",

// //             color:"#ffffff",

// //             border:
// //             "1px solid #374151",

// //             padding:"14px",

// //             borderRadius:"12px"
// //           }
// //         }}
// //       />



// //       {/* ======================================
// //          ROUTES
// //       ====================================== */}

// //       <AppRoutes />



// //     </AuthContext.Provider>
// //   );
// // }
// import { useState } from "react";

// import { Toaster } from "react-hot-toast";

// import AppRoutes from "./routes/AppRoutes";

// import {

//   AuthContext,

//   type User

// } from "./context";



// export default function App(){



//   /* =========================================
//      USER STATE
//   ========================================= */

//   const [user,setUser] =
//   useState<User | null>(() => {

//     const savedUser =
//     localStorage.getItem(
//       "wealth-user"
//     );



//     return savedUser
//       ?
//       JSON.parse(savedUser)
//       :
//       null;
//   });



//   /* =========================================
//      LOGIN FUNCTION
//   ========================================= */

//   const login = (

//     role:string,

//     name?:string,

//     email?:string,

//     employee_code?:string,

//     token?:string

//   ) => {



//     const loggedInUser = {

//       role,

//       name:name || "",

//       email:email || "",

//       employee_code:
//       employee_code || "",

//       token:token || ""
//     };



//     /* ======================================
//        STORE TOKEN
//     ====================================== */

//     if(token){

//       localStorage.setItem(

//         "wealth-token",

//         token
//       );
//     }



//     /* ======================================
//        STORE USER
//     ====================================== */

//     localStorage.setItem(

//       "wealth-user",

//       JSON.stringify(loggedInUser)
//     );



//     setUser(loggedInUser);
//   };



//   /* =========================================
//      LOGOUT FUNCTION
//   ========================================= */

//   const logout = () => {

//     localStorage.removeItem(
//       "wealth-user"
//     );

//     localStorage.removeItem(
//       "wealth-token"
//     );

//     setUser(null);
//   };



//   return (

//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout
//       }}
//     >



//       {/* =====================================
//          GLOBAL TOASTS
//       ===================================== */}

//       <Toaster

//         position="top-right"

//         reverseOrder={false}

//         toastOptions={{

//           duration:3000,

//           style:{

//             background:"#111827",

//             color:"#ffffff",

//             border:
//             "1px solid #374151",

//             borderRadius:"12px",

//             padding:"14px"
//           }
//         }}
//       />



//       {/* =====================================
//          APPLICATION ROUTES
//       ===================================== */}

//       <AppRoutes />



//     </AuthContext.Provider>
//   );
// }

import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";

import UserManagement from "./pages/UserManagement";

import AuditLogs from "./pages/AuditLogs";

import SystemAnalytics from "./pages/SystemAnalytics";

import ServiceMonitoring from "./pages/ServiceMonitoring";

import ApiGovernance from "./pages/ApiGovernance";

import Login from "./pages/Login";

import { Toaster } from "react-hot-toast";



export default function App(){



  /* =====================================
     USER
  ===================================== */

  const storedUser =
  localStorage.getItem(
    "wealth-user"
  );



  const user =
  storedUser
  ?
  JSON.parse(storedUser)
  :
  null;



  /* =====================================
     PAGE STATE
  ===================================== */

  const [currentPage,setCurrentPage] =
  useState("dashboard");



  /* =====================================
     IF NOT LOGIN
  ===================================== */

  if(!user){

    return <Login />;
  }



  /* =====================================
     PAGE RENDER
  ===================================== */

  function renderPage(){



    switch(currentPage){



      case "users":

        return <UserManagement />;



      case "audit":

        return <AuditLogs />;



      case "analytics":

        return <SystemAnalytics />;



      case "services":

        return <ServiceMonitoring />;



      case "governance":

        return <ApiGovernance />;



      default:

        return <Dashboard />;
    }
  }



  return (

    <div className="flex min-h-screen bg-black text-white">



      <Toaster />



      {/* =================================
         SIDEBAR
      ================================= */}

      <Sidebar
        setCurrentPage={
          setCurrentPage
        }
      />



      {/* =================================
         MAIN CONTENT
      ================================= */}

      <div className="flex-1">



        {/* TOPBAR */}

        <div className="border-b border-gray-800 p-5 flex justify-between">

          <div>

            <h1 className="text-2xl font-bold">

              Wealth Platform

            </h1>

            <p className="text-gray-400 text-sm">

              Enterprise Wealth Intelligence

            </p>

          </div>



          <div className="text-right">

            <h3 className="font-semibold">

              {user.name}

            </h3>

            <p className="text-emerald-400 text-sm">

              {user.role}

            </p>

          </div>

        </div>



        {/* PAGE */}

        <div className="p-8">

          {renderPage()}

        </div>

      </div>

    </div>
  );
}