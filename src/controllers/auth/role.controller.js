import db from "../../models/index.js";

const { Role, Permission, RolePermission, sequelize } = db;

export const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const role = await Role.create({ name, description });

    return res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      order: [["id", "ASC"]],
    });

    return res.json({ success: true, data: roles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      order: [["module", "ASC"]],
    });

    const grouped = permissions.reduce((acc, perm) => {
      if (!acc[perm.module]) acc[perm.module] = [];
      acc[perm.module].push(perm);
      return acc;
    }, {});

    return res.json({
      success: true,
      data: grouped,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;

    const role = await Role.findByPk(roleId, {
      include: {
        model: Permission,
        through: { attributes: [] },
      },
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    return res.json({
      success: true,
      data: role.Permissions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRolePermissions = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { roleId } = req.params;
    const { permissionIds } = req.body;
    // permissionIds: [1,2,3]

    if (!Array.isArray(permissionIds)) {
      return res.status(400).json({
        success: false,
        message: "permissionIds must be an array",
      });
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    // Remove existing permissions
    await RolePermission.destroy({
      where: { role_id: roleId },
      transaction,
    });

    // Insert new permissions
    const bulkData = permissionIds.map((permission_id) => ({
      role_id: roleId,
      permission_id,
    }));

    if (bulkData.length) {
      await RolePermission.bulkCreate(bulkData, { transaction });
    }

    await transaction.commit();

    return res.json({
      success: true,
      message: "Role permissions updated successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ success: false, message: error.message });
  }
};

createRole.permission = "add_role";
getRoles.permission = "get_role";
getAllPermissions.permission = "get_all_role_permission";
getRolePermissions.permission = "add_role_permission";
updateRolePermissions.permission = "update_role_permission";
