import express from "express";
import { getNav } from "../controllers/nav.controller";

const router = express.Router();

router.get("/:schemeCode", getNav);

export default router;