const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener todos los dispositivos (con imagen de referencia)
router.get("/", async (req, res) => {
  try {
    const { marca, tipo } = req.query;
    let query = `
      SELECT d.*, i.url AS imagen_principal
      FROM dispositivos d
      LEFT JOIN LATERAL (
        SELECT url 
        FROM imagenes_dispositivo 
        WHERE id_dispositivo = d.id_dispositivo 
        ORDER BY id_imagen ASC 
        LIMIT 1
      ) i ON true
      WHERE 1=1
    `;
    const params = [];

    if (marca) {
      params.push(`%${marca}%`);
      query += ` AND d.marca ILIKE $${params.length}`;
    }
    if (tipo) {
      params.push(`%${tipo}%`);
      query += ` AND d.tipo ILIKE $${params.length}`;
    }

    query += " ORDER BY d.fecha_lanzamiento DESC";

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener dispositivos" });
  }
});

// Obtener detalle de un dispositivo por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dispositivo = await pool.query(
      "SELECT * FROM dispositivos WHERE id_dispositivo = $1",
      [id]
    );

    const imagenes = await pool.query(
      "SELECT * FROM imagenes_dispositivo WHERE id_dispositivo = $1",
      [id]
    );

    const comentarios = await pool.query(
      `SELECT c.id_comentario, c.contenido, c.fecha, u.nombre 
       FROM comentarios c 
       JOIN usuarios u ON c.id_usuario = u.id_usuario 
       WHERE c.id_dispositivo = $1
       ORDER BY c.fecha DESC`,
      [id]
    );

    res.json({
      dispositivo: dispositivo.rows[0],
      imagenes: imagenes.rows,
      comentarios: comentarios.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener detalle de dispositivo" });
  }
});

module.exports = router;
