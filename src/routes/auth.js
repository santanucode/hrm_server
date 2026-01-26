import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/auth/user.model.js";
import Role from "../models/auth/role.model.js";
import Permission from "../models/auth/permission.model.js";

import { comparePassword } from "../utils/bcrypt.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          include: [
            {
              model: Permission,
              attributes: ["code"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "User inactive" });
    }

    const role = user.Role ? user.Role : null;

    const permissions = user.Role?.Permissions?.map((p) => p.code) || [];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role_id: user.Role.id,
        role: user.Role.name,
        permissions: permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      role_id: user.Role.id,
      role: user.Role.name,
      permissions,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
