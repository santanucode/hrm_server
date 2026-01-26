import express from "express";
import {
  createRole,
  getRoles,
  getAllPermissions,
  getRolePermissions,
  updateRolePermissions,
} from "../controllers/auth/role.controller.js";

const router = express.Router();

router.get("/roles", getRoles);
router.post("/roles", createRole);

router.get("/permissions", getAllPermissions);

router.get("/roles/:roleId/permissions", getRolePermissions);
router.put("/roles/:roleId/permissions", updateRolePermissions);

export default router;
