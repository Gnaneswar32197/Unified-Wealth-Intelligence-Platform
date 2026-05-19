import express from "express";

import {
  login,
  logout,
  getCurrentUser,
  refreshToken
} from "../controllers/auth.controller";

import {
  verifyJWT
} from "../middleware/verifyJWT";

import {
  auditMiddleware
} from "../middleware/auditMiddleware";

const router = express.Router();



/* ======================================================
   LOGIN
====================================================== */

router.post(
  "/login",

  auditMiddleware("LOGIN"),

  login
);



/* ======================================================
   LOGOUT
====================================================== */

router.post(
  "/logout",

  verifyJWT,

  auditMiddleware("LOGOUT"),

  logout
);



/* ======================================================
   CURRENT USER
====================================================== */

router.get(
  "/me",

  verifyJWT,

  auditMiddleware("GET_CURRENT_USER"),

  getCurrentUser
);



/* ======================================================
   REFRESH TOKEN
====================================================== */

router.post(
  "/refresh",

  verifyJWT,

  auditMiddleware("REFRESH_TOKEN"),

  refreshToken
);

export default router;