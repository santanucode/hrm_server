import db from "../../models/index.js";

const { Employee, User, Role } = db;
const { Op } = db.Sequelize;

export const getEmployeeList = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const whereCondition = search
      ? {
          [Op.or]: [
            { first_name: { [Op.like]: `%${search}%` } },
            { last_name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { employee_code: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { rows, count } = await Employee.findAndCountAll({
      where: whereCondition,
      attributes: [
        "id",
        "first_name",
        "last_name",
        "gender",
        "date_of_birth",
        "celebrate_dob",
        "email",
        "phone",
        "photo_url",
        "is_completed",
        "employee_code",
        "designation",
        "department",
        "employee_type",
        "joining_date",
        "role_id",
        "created_at",
      ],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["is_active"],
        },
      ],
      limit: Number(limit),
      offset: Number(offset),
      order: [["created_at", "DESC"]],
    });

    const data = rows.map((emp) => ({
      id: emp.id,
      first_name: emp.first_name,
      last_name: emp.last_name,
      gender: emp.gender,
      date_of_birth: emp.date_of_birth,
      celebrate_dob: emp.celebrate_dob,
      email: emp.email,
      phone: emp.phone,

      employee_code: emp.employee_code,
      designation: emp.designation,
      department: emp.department,
      employee_type: emp.employee_type,
      joining_date: emp.joining_date,

      role_id: emp.role_id,
      role: emp.role?.name || null,

      photo_url: emp?.photo_url,

      is_active: emp.is_completed,
      created_at: emp.created_at,
    }));

    res.json({
      success: true,
      data,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        total_pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee list",
      error: error.message,
    });
  }
};

getEmployeeList.permission = "view_employees";
