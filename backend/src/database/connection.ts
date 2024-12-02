import mongoose from "mongoose";
import dotenv from "dotenv";

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// URI de conexão com o MongoDB
const uri: string = process.env.DB_URI || "";

// Objeto mongoose para realizar a conexão
const db = mongoose;

export function connect() {
  db.connect(uri, {
    serverSelectionTimeoutMS: 20000,  // Tempo limite para a conexão com o servidor
    maxPoolSize: 10,                  // Número máximo de conexões no pool
  })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((e) => {
      console.error("Erro ao conectar ao MongoDB:", e.message);
    });

  // Trata o sinal SIGINT (Ctrl + C) para encerrar a conexão
  process.on("SIGINT", async () => {
    try {
      console.log("Conexão com o MongoDB fechada");
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.error("Erro ao fechar a conexão com o MongoDB:", error);
      process.exit(1);
    }
  });
}

// Função para desconectar do MongoDB
export async function disconnect() {
  console.log("Conexão com o MongoDB encerrada");
  await db.disconnect();
}
