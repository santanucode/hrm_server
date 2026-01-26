import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

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
      allowNull: true,
    },

    photo_url: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    celebrate_dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
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

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    joining_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    /* ===== TRACK PROGRESS ===== */
    current_step: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "employees",
    underscored: true,
    timestamps: true,
  },
);

export default Employee;
