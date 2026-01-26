import express from "express";
import {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission,
  bulkDeletePermissions,
} from "../controllers/auth/permission.controller.js";

const router = express.Router();

router.get("/", getPermissions);
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);
router.post("/bulk-delete", bulkDeletePermissions);

export default router;
