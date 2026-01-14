module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Permission", {
    code: { type: DataTypes.STRING, unique: true },
    description: DataTypes.STRING,
    module: DataTypes.STRING
  }, {
    tableName: "permissions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
};
