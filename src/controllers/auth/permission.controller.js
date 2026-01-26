import db from "../../models/index.js";
const { Permission } = db;

/* ---------------- Create ---------------- */
export const createPermission = async (req, res) => {
  const { name, code, module } = req.body;

  const exists = await Permission.findOne({ where: { code, module } });
  if (exists) {
    return res.status(409).json({ message: "Permission already exists" });
  }

  const permission = await Permission.create({ name, code, module });
  res.status(201).json(permission);
};

/* ---------------- Get All ---------------- */
export const getPermissions = async (req, res) => {
  const permissions = await Permission.findAll({
    order: [["module", "ASC"]],
  });
  res.json(permissions);
};

/* ---------------- Update ---------------- */
export const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { name, code, module } = req.body;

  await Permission.update({ name, code, module }, { where: { id } });

  res.json({ message: "Permission updated" });
};

/* ---------------- Delete ---------------- */
export const deletePermission = async (req, res) => {
  const { id } = req.params;
  await Permission.destroy({ where: { id } });
  res.json({ message: "Permission deleted" });
};

/* ---------------- Bulk Delete ---------------- */
export const bulkDeletePermissions = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  await Permission.destroy({
    where: { id: ids },
  });

  res.json({ message: "Permissions deleted" });
};

createPermission.permission = "add_permission";
getPermissions.permission = "get_permission";
updatePermission.permission = "update_permission";
deletePermission.permission = "delete_permission";
bulkDeletePermissions.permission = "delete_multi_permission";
