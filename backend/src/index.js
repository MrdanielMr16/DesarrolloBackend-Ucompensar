const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dispositivosRoutes = require("./routes/dispositivos");
const usuariosRoutes = require("./routes/usuarios");
const comentariosRoutes = require("./routes/comentarios");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/dispositivos", dispositivosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
