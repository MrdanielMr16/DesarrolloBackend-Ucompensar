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

// Crear un dispositivo
router.post("/", async (req, res) => {
  try {
    const { marca, modelo, tipo, fecha_lanzamiento, precio, especificaciones } =
      req.body;

    const result = await pool.query(
      `INSERT INTO dispositivos (marca, modelo, tipo, fecha_lanzamiento, precio, especificaciones) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [marca, modelo, tipo, fecha_lanzamiento, precio, especificaciones]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear dispositivo" });
  }
});

// Subir imágenes a un dispositivo
router.post("/:id/imagenes", async (req, res) => {
  try {
    const { id } = req.params;
    const { urls } = req.body; // array de URLs o strings de imágenes

    const inserts = urls.map((url) =>
      pool.query(
        `INSERT INTO imagenes_dispositivo (id_dispositivo, url) VALUES ($1, $2)`,
        [id, url]
      )
    );

    await Promise.all(inserts);

    res.status(201).json({ message: "✅ Imágenes agregadas correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al subir imágenes" });
  }
});

// Actualizar un dispositivo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, tipo, fecha_lanzamiento, precio, especificaciones } =
      req.body;

    const result = await pool.query(
      `UPDATE dispositivos 
       SET marca = $1, modelo = $2, tipo = $3, fecha_lanzamiento = $4, precio = $5, especificaciones = $6
       WHERE id_dispositivo = $7
       RETURNING *`,
      [marca, modelo, tipo, fecha_lanzamiento, precio, especificaciones, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Dispositivo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar dispositivo" });
  }
});

// Eliminar un dispositivo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM dispositivos WHERE id_dispositivo = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Dispositivo no encontrado" });
    }

    res.json({ message: "✅ Dispositivo eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar dispositivo" });
  }
});

module.exports = router;
