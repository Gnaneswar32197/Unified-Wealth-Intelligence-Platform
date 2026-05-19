import express from "express";

import {
  getAUM
} from "../controllers/analytics.controller";

const router = express.Router();

router.get("/aum", getAUM);

export default router;