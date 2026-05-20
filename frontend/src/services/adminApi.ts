const API =
"http://localhost:5000";



const getHeaders = () => {

  const token =
  localStorage.getItem(
    "wealth-token"
  );

  return {

    "Content-Type":
    "application/json",

    Authorization:
    `Bearer ${token}`
  };
};



/* ==========================================
   ADMIN ANALYTICS
========================================== */

export const fetchAdminAnalytics =
async() => {

  const res =
  await fetch(
    `${API}/api/admin/analytics`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};



/* ==========================================
   USERS
========================================== */

export const fetchUsers =
async() => {

  const res =
  await fetch(
    `${API}/api/admin/users`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};



/* ==========================================
   ROLES
========================================== */

export const fetchRoles =
async() => {

  const res =
  await fetch(
    `${API}/api/roles`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};



/* ==========================================
   AUDIT LOGS
========================================== */

export const fetchAuditLogs =
async() => {

  const res =
  await fetch(
    `${API}/api/audit/logs`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};



/* ==========================================
   SYSTEM HEALTH
========================================== */

export const fetchSystemHealth =
async() => {

  const res =
  await fetch(
    `${API}/api/admin/system-health`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};



/* ==========================================
   SECURITY LOGINS
========================================== */

export const fetchSecurityLogins =
async() => {

  const res =
  await fetch(
    `${API}/api/security/logins`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};



/* ==========================================
   FAILED ATTEMPTS
========================================== */

export const fetchFailedAttempts =
async() => {

  const res =
  await fetch(
    `${API}/api/security/failed-attempts`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};



/* ==========================================
   TOKEN ACTIVITY
========================================== */

export const fetchTokenActivity =
async() => {

  const res =
  await fetch(
    `${API}/api/security/token-activity`,
    {
      headers:getHeaders()
    }
  );

  return res.json();
};