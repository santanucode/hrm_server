// src/models/employee.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    /* ===== STEP 1 : BASIC INFO ===== */
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    celebrate_dob: {
      type: DataTypes.DATEONLY,
      defaultValue: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    draft_status: {
      type: DataTypes.ENUM("DRAFT", "COMPLETED"),
      defaultValue: "DRAFT",
    },

    /* ===== STEP 2 : JOB INFO ===== */
    employee_code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true,
    },

    designation: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    employee_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    role_type: {
      type: DataTypes.ENUM("HR", "Manager", "TeamLeader", "Employee"),
      allowNull: true,
    },

    joining_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    /* ===== STEPPER ===== */
    current_step: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "employees",
    underscored: true,
    timestamps: true,
  }
);

module.exports = Employee;
