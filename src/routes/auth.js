const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const { comparePassword } = require("../utils/bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ 
      where: { email },
      include: [Role]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.is_active) return res.status(403).json({ message: "User inactive" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.Role.name },
      "1234",
      { expiresIn: "1d" }
    );

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.Role.name,
      token,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
