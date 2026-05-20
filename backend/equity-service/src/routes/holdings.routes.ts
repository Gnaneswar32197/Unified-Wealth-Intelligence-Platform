import express from "express";

import {

  getHoldingsByInvestor,

  createHolding,

  updateHolding,

  deleteHolding

} from "../controllers/holdings.controller";

const router = express.Router();



router.get(
  "/:investorId",

  getHoldingsByInvestor
);




router.post(
  "/",

  createHolding
);



/* ======================================================
   UPDATE HOLDING
====================================================== */

router.patch(
  "/:id",

  updateHolding
);



/* ======================================================
   DELETE HOLDING
====================================================== */

router.delete(
  "/:id",

  deleteHolding
);

export default router;