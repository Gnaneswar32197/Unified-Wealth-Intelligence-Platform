import express from "express";

import {

  getTopHoldings,

  getPnLAnalytics

} from "../controllers/analytics.controller";

const router = express.Router();



router.get(
  "/top-holdings",

  getTopHoldings
);



router.get(
  "/pnl/:investorId",

  getPnLAnalytics
);

export default router;