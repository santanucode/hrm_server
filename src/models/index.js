import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";

import Permission from "./auth/permission.model.js";
import Role from "./auth/role.model.js";
import RolePermission from "./auth/rolePermission.model.js";
import User from "./auth/user.model.js";
import Employee from "./employee/employee.model.js";
import EmployeeDocument from "./employee/employeeDocument.model.js";
import EmployeeEducation from "./employee/employeeEducation.model.js";

import EmployeePersonalDetails from "./employee/employeePersonalDetails.model.js";
import employeeExperienceModel from "./employee/employeeExperience.model.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* ================= Models ================= */
db.Employee = Employee;
db.Role = Role;
db.User = User;
db.EmployeePersonalDetails = EmployeePersonalDetails;
db.EmployeeEducation = EmployeeEducation;
db.EmployeeExperience = employeeExperienceModel;
db.EmployeeDocument = EmployeeDocument;

db.Permission = Permission;
db.RolePermission = RolePermission;

/* ================= Associations ================= */
db.User.belongsTo(db.Role, { foreignKey: "role_id" });
db.Role.hasMany(db.User, { foreignKey: "role_id" });

db.User.belongsTo(db.Employee, { foreignKey: "employee_id" });
db.Employee.hasOne(db.User, { foreignKey: "employee_id" });

/* ================= Role ↔ Permission ================= */
db.Role.belongsToMany(db.Permission, {
  through: db.RolePermission,
  foreignKey: "role_id",
  otherKey: "permission_id",
});

db.Permission.belongsToMany(db.Role, {
  through: db.RolePermission,
  foreignKey: "permission_id",
  otherKey: "role_id",
});

/* ================= Employee ↔ Role ================= */
db.Employee.belongsTo(db.Role, {
  foreignKey: "role_id",
  as: "role",
});

db.Role.hasMany(db.Employee, {
  foreignKey: "role_id",
});

export default db;
