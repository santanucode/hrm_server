import db from "../../models/index.js";
const { Employee } = db;

export const createBasicInfo = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      celebrate_dob,
      email,
      phone,
      employee_code,
      designation,
      department,
      employee_type,
      role_id,
      joining_date,
    } = req.body;

    // Check for duplicate email
    const exists = await Employee.findOne({ where: { email } });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const employee = await Employee.create({
      first_name,
      last_name,
      gender,
      date_of_birth,
      celebrate_dob,
      email,
      phone,
      employee_code,
      designation,
      department,
      employee_type,
      role_id,
      joining_date,
      current_step: 2,
      is_completed: false,
    });

    return res.status(201).json({
      success: true,
      message: "Basic info saved successfully",
      employee_id: employee.id,
      current_step: employee.current_step,
      is_completed: employee.is_completed,
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

export const updateBasicInfo = async (req, res) => {
  try {
    const { employee_id, ...payload } = req.body;

    const employee = await Employee.findByPk(employee_id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await employee.update(payload);

    res.json({
      success: true,
      message: "Basic info updated successfully",
      employee_id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getBasicInfoById = async (req, res) => {
  try {
    const { employee_id } = req.params;

    const employee = await Employee.findByPk(employee_id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "gender",
        "date_of_birth",
        "celebrate_dob",
        "email",
        "phone",
        "current_step",
        "is_completed",
        "created_at",
        "updated_at",
      ],
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
      next_step: employee.current_step < 2 ? 2 : employee.current_step,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch basic info",
      error: error.message,
    });
  }
};

createBasicInfo.permission = "add_employee_basic_info";
updateBasicInfo.permission = "edit_employee_basic_info";
getBasicInfoById.permission = "get_employee_basic_info";
