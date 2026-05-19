import express from "express";

import {

  getRoles,

  createRole,

  updateRole,

  deleteRole

} from "../controllers/role.controller";

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
   GET ROLES
====================================================== */

router.get(
  "/",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("GET_ROLES"),

  getRoles
);



/* ======================================================
   CREATE ROLE
====================================================== */

router.post(
  "/",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("CREATE_ROLE"),

  createRole
);



/* ======================================================
   UPDATE ROLE
====================================================== */

router.patch(
  "/:id",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("UPDATE_ROLE"),

  updateRole
);



/* ======================================================
   DELETE ROLE
====================================================== */

router.delete(
  "/:id",

  verifyJWT,

  authorizeRoles("ADMIN"),

  auditMiddleware("DELETE_ROLE"),

  deleteRole
);

export default router;