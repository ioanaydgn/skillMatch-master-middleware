import { teamController } from "controllers/v1";
import { Router } from "express";

let teamRouter = Router();

teamRouter.post('/c',(req,res) => { teamController.CreateTeam(req,res) });
teamRouter.post('/addTeamMem',(req,res) => { teamController.AssignTeamMembers(req,res) });

export default teamRouter;