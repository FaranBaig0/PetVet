const express = require("express");
const router = express.Router();
const db = require("../config/db");

S
router.get("/", (req, res) => {
  const sql = `
    SELECT id, name, specialization, experience, image
    FROM users
    WHERE role = 'doctor'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json(result);
  });
});

module.exports = router
