const express = require("express");
const {
  createBasicInfo,
} = require("../controllers/employeeBasic.controller");

const router = express.Router();

/* STEP-1 */
router.post("/employees/basic", createBasicInfo);

module.exports = router;