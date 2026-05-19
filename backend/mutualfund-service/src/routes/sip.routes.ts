import express from "express";

import {
  getFailedSips,
  getSips
} from "../controllers/sip.controller";

const router = express.Router();

router.get("/failed", getFailedSips);

router.get("/:customerRef", getSips);

export default router;