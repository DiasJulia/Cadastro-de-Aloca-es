import { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import { AppDataSource } from "./data-source";
import express = require("express");
import operacaoRouter from "./routes/OperacaoRoutes";

AppDataSource.initialize()
  .then(async () => {
    const app: Application = express();
    const port = 8080;

    app.use(express.json());

    // Rotas da API
    app.get("/api/ping", (req: Request, res: Response) => {
      res.json({ message: "Pong!" });
    });

    app.use(operacaoRouter);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
