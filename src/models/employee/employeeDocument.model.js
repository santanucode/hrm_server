import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const EmployeeDocument = sequelize.define(
  "EmployeeDocument",
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

    document_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    document_type: {
      type: DataTypes.ENUM(
        "Aadhar",
        "PAN",
        "Passport",
        "Resume",
        "Offer Letter",
        "Appointment Letter",
        "Experience Letter",
        "Education Certificate",
        "Other",
      ),
      allowNull: false,
    },

    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    file_size: {
      type: DataTypes.INTEGER,
    },

    mime_type: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "employee_documents",
    underscored: true,
    timestamps: false,
  },
);

EmployeeDocument.associate = (models) => {
  EmployeeDocument.belongsTo(models.Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
};

export default EmployeeDocument;
