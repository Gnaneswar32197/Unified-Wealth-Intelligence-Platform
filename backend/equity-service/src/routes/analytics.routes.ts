import express from "express";

import {

  getTopHoldings,

  getPnLAnalytics

} from "../controllers/analytics.controller";

const router = express.Router();



/* ======================================================
   TOP HOLDINGS
====================================================== */

router.get(
  "/top-holdings",

  getTopHoldings
);



/* ======================================================
   PNL ANALYTICS
====================================================== */

router.get(
  "/pnl/:investorId",

  getPnLAnalytics
);

export default router;