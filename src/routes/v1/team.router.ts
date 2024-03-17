import { teamController } from "controllers/v1";
import { Router } from "express";

let teamRouter = Router();

teamRouter.post('/c',(req,res) => { teamController.CreateTeam(req,res) });
teamRouter.post('/addTeamMem',(req,res) => { teamController.AssignTeamMembers(req,res) });
teamRouter.get('/getTeamMem/:teamId',(req,res) => { teamController.GetTeamMembersByTeamId(req,res) });
teamRouter.get('/:projectId',(req,res) => { teamController.GetTeamIdByProjectId(req,res) });
teamRouter.get('/v/:projectId',(req,res) => { teamController.ViewTeamByProjectId(req,res) });

export default teamRouter;