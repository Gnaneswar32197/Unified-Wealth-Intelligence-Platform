import express from "express";

import {

  getRMDashboard,

  getRMInvestors,

  getRMPerformance

} from "../controllers/rm.controller";

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
   RM DASHBOARD
====================================================== */

router.get(
  "/dashboard",

  verifyJWT,

  authorizeRoles(
    "RM",
    "ADMIN"
  ),

  auditMiddleware("RM_DASHBOARD"),

  getRMDashboard
);



/* ======================================================
   RM INVESTORS
====================================================== */

router.get(
  "/investors",

  verifyJWT,

  authorizeRoles(
    "RM",
    "ADMIN"
  ),

  auditMiddleware("RM_INVESTORS"),

  getRMInvestors
);



/* ======================================================
   RM PERFORMANCE
====================================================== */

router.get(
  "/performance",

  verifyJWT,

  authorizeRoles(
    "RM",
    "ADMIN"
  ),

  auditMiddleware("RM_PERFORMANCE"),

  getRMPerformance
);

export default router;