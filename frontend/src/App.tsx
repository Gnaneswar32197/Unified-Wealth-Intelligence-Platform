import { useState } from "react";

import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes.tsx";

import {

  AuthContext,

  type User

} from "./context.tsx";



export default function App() {



  /* ==========================================
     USER STATE
  ========================================== */

  const [user, setUser] =
  useState<User | null>(() => {

    const saved =
    localStorage.getItem(
      "wealth-user"
    );

    return saved
      ? JSON.parse(saved)
      : null;
  });



  /* ==========================================
     LOGIN
  ========================================== */

  const login = (

    role: string,

    name?: string,

    email?: string,

    employee_code?: string,

    token?: string

  ) => {



    /* ======================================
       ROLE NORMALIZATION
    ====================================== */

    let normalizedRole =
    role;



    const upper =
    role.toUpperCase();



    if (upper === "ADMIN") {

      normalizedRole =
      "SuperAdmin";

    }

    else if (upper === "ADVISOR") {

      normalizedRole =
      "Advisory";

    }

    else if (upper === "OPERATIONS") {

      normalizedRole =
      "Operations";

    }

    else if (upper === "COMPLIANCE") {

      normalizedRole =
      "Compliance";

    }

    else if (upper === "SECURITY") {

      normalizedRole =
      "Security";
    }



    /* ======================================
       SAVE USER
    ====================================== */

    const newUser = {

      name:
      name || "Alex Mercer",

      role:
      normalizedRole,

      email:
      email || "",

      employee_code:
      employee_code || "",

      token:
      token || ""
    };



    if (token) {

      localStorage.setItem(
        "wealth-token",
        token
      );
    }



    localStorage.setItem(
      "wealth-user",
      JSON.stringify(newUser)
    );



    setUser(newUser);
  };



  /* ==========================================
     LOGOUT
  ========================================== */

  const logout = () => {

    localStorage.removeItem(
      "wealth-user"
    );

    localStorage.removeItem(
      "wealth-token"
    );

    setUser(null);
  };



  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >



      {/* ======================================
         GLOBAL ENTERPRISE TOASTS
      ====================================== */}

      <Toaster

        position="top-right"

        reverseOrder={false}

        toastOptions={{

          duration:3000,

          style:{

            background:"#111827",

            color:"#ffffff",

            border:
            "1px solid #374151",

            padding:"14px",

            borderRadius:"12px",

            boxShadow:
            "0 10px 30px rgba(0,0,0,0.4)"
          },



          success:{

            iconTheme:{

              primary:"#10b981",

              secondary:"#ffffff"
            }
          },



          error:{

            iconTheme:{

              primary:"#ef4444",

              secondary:"#ffffff"
            }
          }
        }}
      />



      {/* ======================================
         APPLICATION ROUTES
      ====================================== */}

      <AppRoutes />



    </AuthContext.Provider>
  );
}