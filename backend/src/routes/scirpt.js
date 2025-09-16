const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // 🔴 cambia según tu configuración
  host: "localhost",
  database: "ContextualizacionUcompensar",
  password: "Axity2023*",
  port: 5432,
});

async function insertarUsuario() {
  const nombre = "Daniel Marin";
  const email = "Daniel@example.com";
  const contrasena = "1234"; // contraseña en texto plano
  const rol = "admin";
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    await pool.query(
      "INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES ($1, $2, $3, $4)",
      [nombre, email, hashedPassword, rol]
    );

    console.log("✅ Usuario insertado con éxito:", email);
  } catch (err) {
    console.error("❌ Error insertando usuario:", err);
  } finally {
    pool.end();
  }
}

insertarUsuario();
