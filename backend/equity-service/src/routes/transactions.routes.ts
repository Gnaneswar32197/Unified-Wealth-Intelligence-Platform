import express from "express";

import {

  getTransactionsByInvestor,

  createTransaction,

  getTransactionHistory

} from "../controllers/transactions.controller";

const router = express.Router();



/* ======================================================
   GET TRANSACTIONS
====================================================== */

router.get(
  "/:investorId",

  getTransactionsByInvestor
);



/* ======================================================
   CREATE TRANSACTION
====================================================== */

router.post(
  "/",

  createTransaction
);



/* ======================================================
   TRANSACTION HISTORY
====================================================== */

router.get(
  "/history/:investorId",

  getTransactionHistory
);

export default router;