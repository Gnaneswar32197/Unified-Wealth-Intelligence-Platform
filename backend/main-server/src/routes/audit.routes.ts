import express from "express";

import {

  getAuditLogs,

  getAuditLogById,

  exportAuditLogs

} from "../controllers/audit.controller";

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
   GET ALL AUDIT LOGS
====================================================== */

router.get(
  "/logs",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "COMPLIANCE",
    "SECURITY"
  ),

  auditMiddleware("GET_AUDIT_LOGS"),

  getAuditLogs
);



/* ======================================================
   GET SINGLE AUDIT LOG
====================================================== */

router.get(
  "/logs/:id",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "COMPLIANCE",
    "SECURITY"
  ),

  auditMiddleware("GET_AUDIT_LOG_BY_ID"),

  getAuditLogById
);



/* ======================================================
   EXPORT AUDIT LOGS
====================================================== */

router.get(
  "/export",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "COMPLIANCE"
  ),

  auditMiddleware("EXPORT_AUDIT_LOGS"),

  exportAuditLogs
);

export default router;