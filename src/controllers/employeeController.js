const sequelize = require("../config/db");
const Employee = require("../models/Employee");
const User = require("../models/User");
const { hashPassword } = require("../utils/bcrypt");

exports.createEmployee = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      date_of_birth,

      employee_code,
      designation,
      department,
      employee_type,
      joining_date,

      has_system_access,
      role_id,
      username,
      password
    } = req.body;

    // 1️⃣ Create Employee
    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      phone,
      gender,
      date_of_birth,
      employee_code,
      designation,
      department,
      employee_type,
      joining_date,
      draft_status: "DRAFT"
    }, { transaction: t });

    // 2️⃣ Create system user (if enabled)
    if (has_system_access) {
      if (!role_id || !password) {
        throw new Error("Role & password required for system access");
      }

      const hashedPassword = await hashPassword(password);

      await User.create({
        employee_id: employee.id,
        role_id,
        email,
        username,
        password: hashedPassword,
        is_active: 0   // 🔒 SuperAdmin must activate
      }, { transaction: t });
    }

    await t.commit();

    res.status(201).json({
      message: "Employee created successfully",
      employee_id: employee.id
    });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};
