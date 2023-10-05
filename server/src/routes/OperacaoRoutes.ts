import { Router } from "express";
import OperacaoController from "../controllers/OperacaoController";

const operacaoRouter = Router();
const operacaoController = new OperacaoController();

operacaoRouter
  .route("/")
  .post(operacaoController.create)
  .get(operacaoController.readAll);

operacaoRouter.route("/grouped").get(operacaoController.readAllGroupedByCNPJ);

operacaoRouter.route("/:CNPJ").get(operacaoController.readByCNPJ);

operacaoRouter
  .route("/:id")
  .put(operacaoController.update)
  .delete(operacaoController.delete);

export default operacaoRouter;
