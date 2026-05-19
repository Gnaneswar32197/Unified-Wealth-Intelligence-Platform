import express from "express";

import {

  getWatchlist,

  addToWatchlist,

  deleteWatchlistItem

} from "../controllers/watchlist.controller";

const router = express.Router();



/* ======================================================
   GET WATCHLIST
====================================================== */

router.get(
  "/:investorId",

  getWatchlist
);



/* ======================================================
   ADD WATCHLIST
====================================================== */

router.post(
  "/",

  addToWatchlist
);



/* ======================================================
   DELETE WATCHLIST ITEM
====================================================== */

router.delete(
  "/:id",

  deleteWatchlistItem
);

export default router;