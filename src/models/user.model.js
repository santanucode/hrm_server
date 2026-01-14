const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = require("./role.model");
const Employee = require("./employee.model");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING(150), unique: true, allowNull: false },
    username: { type: DataTypes.STRING(100), unique: true, allowNull: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Associations
User.belongsTo(Role, { foreignKey: "role_id" });
User.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = User;
