import { Router } from "express";
import FundoController from "../controllers/FundoController";

const fundoRouter = Router();
const fundoController = new FundoController();

fundoRouter
  .route("/")
  .post(fundoController.createFromCSV)
  .get(fundoController.readByCNPJAndDate);

fundoRouter.route("/:CNPJ").get(fundoController.readByCNPJ);

export default fundoRouter;
