import db from "../../models/index.js";
import { hashPassword } from "../../utils/bcrypt.js";

const { Employee, User, Sequelize } = db;
const { Op } = Sequelize;

export const updateSystemAccess = async (req, res) => {
  try {
    const { employee_id, username, password, is_active } = req.body;

    if (!employee_id || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "employee_id, username and password are required",
      });
    }

    /* ================= Fetch Employee ================= */
    const employee = await Employee.findOne({
      where: { id: employee_id },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (!employee.role_id) {
      return res.status(400).json({
        success: false,
        message: "Assign role before creating system access",
      });
    }

    /* ================= Username / Email Check ================= */
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: employee.email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    /* ================= Password Hash ================= */
    const hashedPassword = await hashPassword(password);

    /* ================= Create User ================= */
    const user = await User.create({
      employee_id: employee.id,
      role_id: employee.role_id,
      email: employee.email,
      username,
      password: hashedPassword,
      is_active: is_active ?? false,
    });

    /* ================= Update Employee Step ================= */
    await employee.update({
      current_step: 3,
      is_completed: false,
    });

    return res.status(200).json({
      success: true,
      message: "System access created successfully",
      employee_id: employee.id,
      user_id: user.id,
      current_step: 3,
      next_step: 4,
    });
  } catch (error) {
    console.error("SYSTEM ACCESS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create system access",
      error: error.message,
    });
  }
};

export const editSystemAccess = async (req, res) => {
  const { employee_id, username, is_active, role_id } = req.body;

  const user = await User.findOne({ where: { employee_id } });
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.update({ username, is_active, role_id });

  res.json({ success: true, message: "System access updated" });
};

updateSystemAccess.permission = "create_employee_access";
editSystemAccess.permission = "update_employee_access";
