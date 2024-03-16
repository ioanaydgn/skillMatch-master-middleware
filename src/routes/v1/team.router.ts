import { teamController } from "controllers/v1";
import { Router } from "express";

let teamRouter = Router();

teamRouter.post('/',(req,res) => { teamController.CreateTeam(req,res) });

export default teamRouter;