const express = require("express");
const router = express.Router();

const { createEmployee } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createEmployee);

module.exports = router;
