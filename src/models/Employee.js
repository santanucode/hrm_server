const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define("Employee", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING(100), allowNull: false },
  last_name: { type: DataTypes.STRING(100), allowNull: false },
  gender: { type: DataTypes.STRING(20), allowNull: true },
  date_of_birth: { type: DataTypes.DATEONLY, allowNull: true },
  celebrate_dob: { type: DataTypes.BOOLEAN, defaultValue: false },
  email: { type: DataTypes.STRING(150), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  draft_status: { type: DataTypes.ENUM("DRAFT","COMPLETED"), defaultValue: "DRAFT" },
  employee_code: { type: DataTypes.STRING(50), allowNull: true, unique: true },
  designation: { type: DataTypes.STRING(100), allowNull: true },
  department: { type: DataTypes.STRING(100), allowNull: true },
  employee_type: { type: DataTypes.STRING(50), allowNull: true },
  role_type: { type: DataTypes.STRING(50), allowNull: true },
  joining_date: { type: DataTypes.DATEONLY, allowNull: true },
}, {
  tableName: "employees",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Employee;
