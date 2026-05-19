import express from "express";

import {

  getLoginActivity,

  getSessions,

  getFailedAttempts,

  getTokenActivity

} from "../controllers/security.controller";

import {
  verifyJWT
} from "../middleware/verifyJWT";

import {
  authorizeRoles
} from "../middleware/authorizeRoles";

import {
  auditMiddleware
} from "../middleware/auditMiddleware";

const router = express.Router();



/* ======================================================
   LOGIN ACTIVITY
====================================================== */

router.get(
  "/logins",

  verifyJWT,

  authorizeRoles(
    "SECURITY",
    "ADMIN"
  ),

  auditMiddleware("SECURITY_LOGINS"),

  getLoginActivity
);



/* ======================================================
   ACTIVE SESSIONS
====================================================== */

router.get(
  "/sessions",

  verifyJWT,

  authorizeRoles(
    "SECURITY",
    "ADMIN"
  ),

  auditMiddleware("ACTIVE_SESSIONS"),

  getSessions
);



/* ======================================================
   FAILED ATTEMPTS
====================================================== */

router.get(
  "/failed-attempts",

  verifyJWT,

  authorizeRoles(
    "SECURITY",
    "ADMIN"
  ),

  auditMiddleware("FAILED_LOGIN_ATTEMPTS"),

  getFailedAttempts
);



/* ======================================================
   TOKEN ACTIVITY
====================================================== */

router.get(
  "/token-activity",

  verifyJWT,

  authorizeRoles(
    "SECURITY",
    "ADMIN"
  ),

  auditMiddleware("TOKEN_ACTIVITY"),

  getTokenActivity
);

export default router;