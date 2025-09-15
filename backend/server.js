const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Ejemplo de API REST: lista de tareas
let tareas = [
  { id: 1, nombre: "Estudiar Angular", completado: false },
  { id: 2, nombre: "Configurar backend", completado: true },
];

// Obtener todas las tareas
app.get("/api/tareas", (req, res) => {
  res.json(tareas);
});

// Crear tarea
app.post("/api/tareas", (req, res) => {
  const nueva = { id: tareas.length + 1, ...req.body };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
