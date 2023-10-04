import { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import { AppDataSource } from "./data-source";
import express = require("express");
import operacaoRouter from "./routes/OperacaoRoutes";

const app: Application = express();
const port = 3000;

app.use(express.json());

// Rotas da API
app.get("/api/ping", (req: Request, res: Response) => {
  res.json({ message: "Pong!" });
});

app.use("/api/operacao", operacaoRouter);

async function startServer() {
  try {
    await AppDataSource.initialize(); // Inicializa o banco de dados
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize the database:", error);
  }
}

if (require.main === module) {
  startServer(); // Executado apenas quando o arquivo é executado diretamente
}

export { app };
