import express from "express";

import {

  getAdvisorAnalytics,

  getDiversificationAnalysis,

  getRiskAnalysis,

  getRecommendations

} from "../controllers/advisor.controller";

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
   ANALYTICS
====================================================== */

router.get(
  "/analytics",

  verifyJWT,

  authorizeRoles(
    "ADVISOR",
    "ADMIN"
  ),

  auditMiddleware("ADVISOR_ANALYTICS"),

  getAdvisorAnalytics
);



/* ======================================================
   DIVERSIFICATION
====================================================== */

router.get(
  "/diversification",

  verifyJWT,

  authorizeRoles(
    "ADVISOR",
    "ADMIN"
  ),

  auditMiddleware("DIVERSIFICATION_ANALYSIS"),

  getDiversificationAnalysis
);



/* ======================================================
   RISK ANALYSIS
====================================================== */

router.get(
  "/risk-analysis",

  verifyJWT,

  authorizeRoles(
    "ADVISOR",
    "ADMIN"
  ),

  auditMiddleware("RISK_ANALYSIS"),

  getRiskAnalysis
);



/* ======================================================
   RECOMMENDATIONS
====================================================== */

router.get(
  "/recommendations",

  verifyJWT,

  authorizeRoles(
    "ADVISOR",
    "ADMIN"
  ),

  auditMiddleware("INVESTMENT_RECOMMENDATIONS"),

  getRecommendations
);

export default router;