import { Router } from "express";
import ApiController from "../controllers/ApiController";

const apiRouter = Router();
const apiController = new ApiController();

apiRouter.route("/").get(apiController.fetchCSVDataByCNPJAndDate);

export default apiRouter;
