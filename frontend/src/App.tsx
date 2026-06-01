import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { AuthContext, type User } from "./context";

export default function App() {
  /* =========================================
     USER STATE
  ========================================= */
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("wealth-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /* =========================================
     LOGIN FUNCTION
  ========================================= */
  const login = (
    role: string,
    name?: string,
    email?: string,
    employee_code?: string,
    token?: string
  ) => {
    const loggedInUser = {
      role,
      name: name || "",
      email: email || "",
      employee_code: employee_code || "",
      token: token || ""
    };

    /* ======================================
       STORE TOKEN
    ====================================== */
    if (token) {
      localStorage.setItem("wealth-token", token);
    }

    /* ======================================
       STORE USER
    ====================================== */
    localStorage.setItem("wealth-user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);
  };

  /* =========================================
     LOGOUT FUNCTION
  ========================================= */
  const logout = () => {
    localStorage.removeItem("wealth-user");
    localStorage.removeItem("wealth-token");
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
      {/* =====================================
         GLOBAL TOASTS
      ===================================== */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#ffffff",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "14px"
          }
        }}
      />

      {/* =====================================
         APPLICATION ROUTES
      ===================================== */}
      <AppRoutes />
    </AuthContext.Provider>
  );
}