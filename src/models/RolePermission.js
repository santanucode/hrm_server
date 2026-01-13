module.exports = (sequelize, DataTypes) => {
  return sequelize.define("RolePermission", {}, {
    tableName: "role_permissions",
    timestamps: false
  });
};
