import express from "express";

import {

  getAllUsers,

  createUser,

  updateUserRole,

  updateUserStatus,

  deleteUser,

  getSystemHealth,

  getPlatformAnalytics

} from "../controllers/admin.controller";

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
   GET ALL USERS
====================================================== */

router.get(
  "/users",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("GET_ALL_USERS"),

  getAllUsers
);



/* ======================================================
   CREATE USER
====================================================== */

router.post(
  "/users",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("CREATE_USER"),

  createUser
);



/* ======================================================
   UPDATE USER ROLE
====================================================== */

router.patch(
  "/users/:id/role",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("UPDATE_ROLE"),

  updateUserRole
);



/* ======================================================
   UPDATE USER STATUS
====================================================== */

router.patch(
  "/users/:id/status",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("UPDATE_USER_STATUS"),

  updateUserStatus
);



/* ======================================================
   DELETE USER
====================================================== */

router.delete(
  "/users/:id",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("DELETE_USER"),

  deleteUser
);



/* ======================================================
   SYSTEM HEALTH
====================================================== */

router.get(
  "/system-health",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("SYSTEM_HEALTH"),

  getSystemHealth
);



/* ======================================================
   PLATFORM ANALYTICS
====================================================== */

router.get(
  "/analytics",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("PLATFORM_ANALYTICS"),

  getPlatformAnalytics
);

export default router;