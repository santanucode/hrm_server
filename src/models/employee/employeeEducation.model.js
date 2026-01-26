import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Employee from "./employee.model.js";

const EmployeeEducation = sequelize.define(
  "EmployeeEducation",
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

    qualification: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    institute: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    board_university: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    year_of_passing: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  {
    tableName: "employee_education",
    timestamps: true,
    underscored: true,
  }
);

/* ================= Associations ================= */
EmployeeEducation.belongsTo(Employee, {
  foreignKey: "employee_id",
});

Employee.hasMany(EmployeeEducation, {
  foreignKey: "employee_id",
});

export default EmployeeEducation;
