import express from "express";

import cors from "cors";

import equityRoutes
from "./routes/equity.routes";

import holdingsRoutes
from "./routes/holdings.routes";

import transactionRoutes
from "./routes/transactions.routes";

import watchlistRoutes
from "./routes/watchlist.routes";

import marketRoutes
from "./routes/market.routes";

import analyticsRoutes
from "./routes/analytics.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/equity",
  equityRoutes
);

app.use(
  "/api/equity/holdings",
  holdingsRoutes
);

app.use(
  "/api/equity/transactions",
  transactionRoutes
);

app.use(
  "/api/equity/watchlist",
  watchlistRoutes
);

app.use(
  "/api/equity/market",
  marketRoutes
);

app.use(
  "/api/equity/analytics",
  analyticsRoutes
);

export default app;