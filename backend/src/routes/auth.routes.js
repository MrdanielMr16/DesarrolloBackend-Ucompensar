const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db"); // tu conexión a PostgreSQL

const router = express.Router();

// 🔐 Login
router.post("/login", async (req, res) => {
  console.log("📥 Datos recibidos:", req.body);
  const { email, contrasena } = req.body;

  try {
    // buscar usuario
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // verificar contraseña
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // crear token
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email },
      "secreto_super_seguro", // 🔴 cambia por variable de entorno
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.id_usuario, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
