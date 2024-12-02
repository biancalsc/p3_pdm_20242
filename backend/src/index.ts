import express from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Configuração de rotas
app.use("/api", bookRoutes);

// Inicializa o servidor na porta 3010
app.listen(3010, () => {
  console.log("Servidor rodando na porta 3010");
});
