const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Check if email exists
  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)";
      db.query(
        insertSql,
        [name, email, hashedPassword, role || "client", phone || ""],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Server error" });

          const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: result.insertId, name, email, role, phone },
          });
        }
      );
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Server Error" });

    if (result.length === 0)
      return res.status(404).json({ message: "Invalid Credentials" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  });
});

module.exports = router;
