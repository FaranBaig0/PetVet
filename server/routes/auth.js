const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

//----- SIGNUP -----
router.post("/signup", async (req, res) => {
  try {
    console.log("BODY:", req.body); 

    const { name, email, password,role,phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
  INSERT INTO users (full_name, email, password_hash, role, phone)
  VALUES (?, ?, ?, ?, ?)
`;

db.query(
  sql,
  [name, email, hashedPassword, role, phone],
  (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Signup successful" });
  }
);


  } catch (error) {
    console.error("SIGNUP ERROR:", error); 
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});


//----- LOGIN -----
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const sql = "SELECT * FROM users WHERE email = ?";
//   db.query(sql, [email], async (err, result) => {
//     if (err) return res.status(500).json({ message: "Server Error" });

//     if (result.length === 0)
//       return res.status(404).json({ message: "Invalid Credentials" });

//     const user = result[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);

//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid Password" });

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login Successful",
//       token,
//       user: { id: user.id, email: user.email, name: user.name, role: user.role },
//     });
//   });
// });

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Server Error" });

    if (result.length === 0)
      return res.status(401).json({ message: "Invalid Credentials" });

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  });
});


module.exports = router;
