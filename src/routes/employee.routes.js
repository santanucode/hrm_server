import express from "express";

import {
  createBasicInfo,
  getBasicInfoById,
  updateBasicInfo,
} from "../controllers/employee/employeeBasic.controller.js";

import authMiddleware from "../middleware/auth/authMiddleware.js";

import {
  deleteDocument,
  getDocumentsByEmployee,
  uploadDocument,
} from "../controllers/employee/employeeDocument.controller.js";
import {
  addEducationDetails,
  deleteEducation,
  updateEducation,
} from "../controllers/employee/employeeEducation.controller.js";
import {
  addExperience,
  deleteExperience,
  getExperienceByEmployee,
  updateExperience,
} from "../controllers/employee/employeeExperience.controller.js";
import { getEmployeeList } from "../controllers/employee/employeeList.controller.js";
import { updatePersonalDetails } from "../controllers/employee/employeePersonal.controller.js";
import {
  editSystemAccess,
  updateSystemAccess,
} from "../controllers/employee/systemAccess.controller.js";
import permissionGuard from "../middleware/auth/permission.middleware.js";
import { documentUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get(
  "/basic-info/:employee_id",
  authMiddleware,
  permissionGuard,
  getBasicInfoById,
);

router.post(
  "/employees/basic-info",
  authMiddleware,
  permissionGuard,
  createBasicInfo,
);

router.put(
  "/employees/basic-info",
  authMiddleware,
  permissionGuard,
  updateBasicInfo,
);

router.post(
  "/employees/system-access",
  authMiddleware,
  permissionGuard,
  updateSystemAccess,
);

router.put(
  "/employees/system-access",
  authMiddleware,
  permissionGuard,
  editSystemAccess,
);

router.post(
  "/employees/personal-details",
  authMiddleware,
  permissionGuard,
  updatePersonalDetails,
);

router.post(
  "/employees/education",
  authMiddleware,
  permissionGuard,
  addEducationDetails,
);

router.put(
  "/employees/education/:id",
  authMiddleware,
  permissionGuard,
  updateEducation,
);
router.delete(
  "/employees/education/:id",
  authMiddleware,
  permissionGuard,
  deleteEducation,
);

router.post(
  "/employees/employee-experience",
  authMiddleware,
  permissionGuard,
  addExperience,
);
router.get(
  "/employees/employee-experience/:employee_id",
  authMiddleware,
  permissionGuard,
  getExperienceByEmployee,
);
router.put(
  "/employees/employee-experience/:id",
  authMiddleware,
  permissionGuard,
  updateExperience,
);
router.delete(
  "/employees/employee-experience/:id",
  authMiddleware,
  permissionGuard,
  deleteExperience,
);

router.post(
  "/employees/employee-documents",
  authMiddleware,
  permissionGuard,
  documentUpload.single("file"),
  uploadDocument,
);

router.get(
  "/employees/employee-documents/:employee_id",
  authMiddleware,
  permissionGuard,
  getDocumentsByEmployee,
);

router.delete(
  "/employees/employee-documents/:id",
  authMiddleware,
  permissionGuard,
  deleteDocument,
);

router.get("/employees", authMiddleware, permissionGuard, getEmployeeList);

export default router;
