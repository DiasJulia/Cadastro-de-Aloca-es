import { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { Application } from "express-serve-static-core";
import { AppDataSource } from "./data-source";
import express = require("express");
import cors from "cors";
import operacaoRouter from "./routes/OperacaoRoutes";

import swaggerDocument from "./docs";

const app: Application = express();
const port = 3000;

app.use(express.json());

const options: cors.CorsOptions = {
  allowedHeaders: ["*"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));

// Rotas da API
app.get("/api/ping", (req: Request, res: Response) => {
  res.json({ message: "Pong!" });
});

app.use("/api/operacao", operacaoRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
