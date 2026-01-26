import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Employee from "./employee.model.js";

const EmployeeExperience = sequelize.define(
  "EmployeeExperience",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    company: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    job_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    responsibilities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    designation: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "employee_experience",
    underscored: true,
    timestamps: true,
  }
);

/* ---------------- Associations ---------------- */
EmployeeExperience.belongsTo(Employee, {
  foreignKey: "employee_id",
});

Employee.hasMany(EmployeeExperience, {
  foreignKey: "employee_id",
});

export default EmployeeExperience;
