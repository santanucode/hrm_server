import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Employee from "./employee.model.js";

const EmployeePersonalDetails = sequelize.define(
  "EmployeePersonalDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    father_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    mother_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    marital_status: {
      type: DataTypes.ENUM("Single", "Married", "Divorced", "Widowed"),
      allowNull: true,
    },

    spouse_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    nationality: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    blood_group: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    emergency_contact_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    emergency_contact_phone: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    aadhar_number: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },

    pan_number: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    current_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    permanent_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "employee_personal_details",
    timestamps: true,
    underscored: true,
  }
);

/* ================= Associations ================= */
EmployeePersonalDetails.belongsTo(Employee, {
  foreignKey: "employee_id",
});

Employee.hasOne(EmployeePersonalDetails, {
  foreignKey: "employee_id",
});

export default EmployeePersonalDetails;
