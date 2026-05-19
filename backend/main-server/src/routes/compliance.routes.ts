import express from "express";

import {

  getComplianceReports,

  getAccessLogs,

  getActivityLogs,

  exportReports

} from "../controllers/compliance.controller";

import {
  verifyJWT
} from "../middleware/verifyJWT";

import {
  authorizeRoles
} from "../middleware/authorizeRoles";

import {
  auditMiddleware
} from "../middleware/auditMiddleware";

const router = express.Router();



/* ======================================================
   COMPLIANCE REPORTS
====================================================== */

router.get(
  "/reports",

  verifyJWT,

  authorizeRoles(
    "COMPLIANCE",
    "ADMIN"
  ),

  auditMiddleware("COMPLIANCE_REPORTS"),

  getComplianceReports
);



/* ======================================================
   ACCESS LOGS
====================================================== */

router.get(
  "/access-logs",

  verifyJWT,

  authorizeRoles(
    "COMPLIANCE",
    "ADMIN"
  ),

  auditMiddleware("ACCESS_LOGS"),

  getAccessLogs
);



/* ======================================================
   ACTIVITY LOGS
====================================================== */

router.get(
  "/activity-logs",

  verifyJWT,

  authorizeRoles(
    "COMPLIANCE",
    "ADMIN"
  ),

  auditMiddleware("ACTIVITY_LOGS"),

  getActivityLogs
);



/* ======================================================
   EXPORT REPORTS
====================================================== */

router.get(
  "/export/:type",

  verifyJWT,

  authorizeRoles(
    "COMPLIANCE",
    "ADMIN"
  ),

  auditMiddleware("EXPORT_REPORTS"),

  exportReports
);

export default router;