import { Router } from "express";
import OperacaoController from "../controllers/OperacaoController";

const operacaoRouter = Router();
const operacaoController = new OperacaoController();

operacaoRouter
  .route("/")
  .post(operacaoController.create)
  .get(operacaoController.readAll);

operacaoRouter.route("/:CNPJ").get(operacaoController.readByCNPJ);

export default operacaoRouter;
