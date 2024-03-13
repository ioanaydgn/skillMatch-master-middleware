import projectController from "controllers/v1/project.controller";
import { Router } from "express";
import { authToken } from "middlewares";
let projectRouter = Router();

projectRouter.post('/',(req,res) => { projectController.CreateProject(req,res) });
projectRouter.delete('/:projectId',(req,res) => { projectController.DeleteProject(req,res) });
projectRouter.put('/:projectId',(req,res) => { projectController.UpdateProject(req,res) });


export default projectRouter;