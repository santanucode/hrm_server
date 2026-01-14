const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RolePermission = sequelize.define(
  "RolePermission",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    
  },
  {
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at",
  }
);

module.exports = RolePermission;
