const checkPermission = (permission) => {
  return async (req, res, next) => {
    if (["SuperAdmin", "Director", "Chairman"].includes(req.user.role)) {
      return next(); 
    }

    const permissions = req.user.permissions || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};

module.exports = checkPermission;
