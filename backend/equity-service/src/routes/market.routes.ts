import express from "express";

import {

  getMarketPrices,

  getMarketPriceBySymbol

} from "../controllers/market.controller";

const router = express.Router();



/* ======================================================
   GET MARKET PRICES
====================================================== */

router.get(
  "/prices",

  getMarketPrices
);



/* ======================================================
   GET MARKET SYMBOL
====================================================== */

router.get(
  "/:symbol",

  getMarketPriceBySymbol
);

export default router;