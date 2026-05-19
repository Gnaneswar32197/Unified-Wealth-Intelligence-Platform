import express from "express";

import {

  getAllInvestors,

  getInvestorById,

  getUnifiedPortfolio,

  getWealthSummary,

  getInvestorActivity

} from "../controllers/investor.controller";

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
   GET ALL INVESTORS
====================================================== */

router.get(
  "/",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "RM",
    "ADVISOR",
    "OPERATIONS",
    "COMPLIANCE"
  ),

  auditMiddleware("GET_ALL_INVESTORS"),

  getAllInvestors
);



/* ======================================================
   GET INVESTOR BY ID
====================================================== */

router.get(
  "/:id",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "RM",
    "ADVISOR",
    "OPERATIONS",
    "COMPLIANCE"
  ),

  auditMiddleware("GET_INVESTOR_BY_ID"),

  getInvestorById
);



/* ======================================================
   GET UNIFIED PORTFOLIO
====================================================== */

router.get(
  "/:id/portfolio",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "RM",
    "ADVISOR"
  ),

  auditMiddleware("GET_UNIFIED_PORTFOLIO"),

  getUnifiedPortfolio
);



/* ======================================================
   GET WEALTH SUMMARY
====================================================== */

router.get(
  "/:id/wealth-summary",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "RM",
    "ADVISOR"
  ),

  auditMiddleware("GET_WEALTH_SUMMARY"),

  getWealthSummary
);



/* ======================================================
   GET INVESTOR ACTIVITY
====================================================== */

router.get(
  "/:id/activity",

  verifyJWT,

  authorizeRoles(
    "ADMIN",
    "RM",
    "OPERATIONS",
    "COMPLIANCE"
  ),

  auditMiddleware("GET_INVESTOR_ACTIVITY"),

  getInvestorActivity
);

export default router;