import express from "express";

import {

  getFailedSIPs,

  getInactiveInvestors,

  getServiceFailures,

  retryJob,

  getReconciliation

} from "../controllers/operations.controller";

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
   FAILED SIPS
====================================================== */

router.get(
  "/failed-sips",

  verifyJWT,

  authorizeRoles(
    "OPERATIONS",
    "ADMIN"
  ),

  auditMiddleware("FAILED_SIPS"),

  getFailedSIPs
);



/* ======================================================
   INACTIVE INVESTORS
====================================================== */

router.get(
  "/inactive-investors",

  verifyJWT,

  authorizeRoles(
    "OPERATIONS",
    "ADMIN"
  ),

  auditMiddleware("INACTIVE_INVESTORS"),

  getInactiveInvestors
);



/* ======================================================
   SERVICE FAILURES
====================================================== */

router.get(
  "/service-failures",

  verifyJWT,

  authorizeRoles(
    "OPERATIONS",
    "ADMIN"
  ),

  auditMiddleware("SERVICE_FAILURES"),

  getServiceFailures
);



/* ======================================================
   RETRY JOB
====================================================== */

router.post(
  "/retry-job/:id",

  verifyJWT,

  authorizeRoles(
    "OPERATIONS",
    "ADMIN"
  ),

  auditMiddleware("RETRY_JOB"),

  retryJob
);



/* ======================================================
   RECONCILIATION
====================================================== */

router.get(
  "/reconciliation",

  verifyJWT,

  authorizeRoles(
    "OPERATIONS",
    "ADMIN"
  ),

  auditMiddleware("RECONCILIATION"),

  getReconciliation
);

export default router;