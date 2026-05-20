import express from "express";

import {

  getEquityUsers,

  getEquityUserById

} from "../controllers/equity.controller";

const router = express.Router();



router.get(
  "/users",

  getEquityUsers
);



router.get(
  "/users/:id",

  getEquityUserById
);

export default router;