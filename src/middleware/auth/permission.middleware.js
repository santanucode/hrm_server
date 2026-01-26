import db from "../../models/index.js";
const { Role, Permission } = db;

export default async function permissionGuard(req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const controller = req.route.stack.at(-1).handle;

    const requiredPermission = controller.permission;
    
    console.log("???????", requiredPermission)

    if (!requiredPermission) {
      return next();
    }

    const role = await Role.findOne({
      where: { id: user.role_id },
      include: [
        {
          model: Permission,
          attributes: ["code"],
          through: { attributes: [] },
        },
      ],
    });

    const rolePermissions = role.Permissions.map((p) => p.code);

    if (!rolePermissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
