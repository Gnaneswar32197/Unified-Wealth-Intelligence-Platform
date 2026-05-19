import express from "express";
import { getFunds } from "../controllers/fund.controller";

const router = express.Router();

router.get("/:customerRef", getFunds);

export default router;