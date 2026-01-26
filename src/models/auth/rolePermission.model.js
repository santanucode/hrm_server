import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const RolePermission = sequelize.define(
  "RolePermission",
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "role_permissions",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default RolePermission;
