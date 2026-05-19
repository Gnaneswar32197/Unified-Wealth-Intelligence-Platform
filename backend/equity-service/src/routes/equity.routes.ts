import express from "express";

import {

  getEquityUsers,

  getEquityUserById

} from "../controllers/equity.controller";

const router = express.Router();



/* ======================================================
   GET ALL EQUITY USERS
====================================================== */

router.get(
  "/users",

  getEquityUsers
);



/* ======================================================
   GET EQUITY USER BY ID
====================================================== */

router.get(
  "/users/:id",

  getEquityUserById
);

export default router;