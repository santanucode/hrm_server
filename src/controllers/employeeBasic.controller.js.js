const db = require("../models");
const Employee = db.Employee;

/**
 * STEP 1: BASIC INFO
 * Creates employee draft
 */
const createBasicInfo = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      celebrate_dob,
      email,
      phone,
    } = req.body;

    // prevent duplicate email
    const exists = await Employee.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const employee = await Employee.create({
      first_name,
      last_name,
      gender,
      date_of_birth,
      celebrate_dob,
      email,
      phone,
      draft_status: "DRAFT",
      current_step: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Basic info saved successfully",
      employee_id: employee.id,
      next_step: 2,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save basic info",
      error: error.message,
    });
  }
};

module.exports = {
  createBasicInfo,
};
