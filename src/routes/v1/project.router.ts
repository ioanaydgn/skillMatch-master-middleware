import projectController from "controllers/v1/project.controller";
import { Router } from "express";
import { authToken } from "middlewares";
let projectRouter = Router();

projectRouter.post('/',(req,res) => { projectController.CreateProject(req,res) });
projectRouter.delete('/:projectId',(req,res) => { projectController.DeleteProject(req,res) });
projectRouter.put('/:projectId',(req,res) => { projectController.UpdateProject(req,res) });
projectRouter.get('/:projectId',(req,res) => { projectController.GetProjectById(req,res) });
projectRouter.post("/p/propose-project-assignment", (req, res) => { projectController.ProposeProjectAssignment(req, res) });
projectRouter.post("/p/findAvailableEmployees", (req, res) => { projectController.FindAvailableEmployees(req, res) });
projectRouter.get("/p/:projectId",(req,res) => { projectController.ViewAssignmentProposals(req,res) });
projectRouter.delete("/p/:proposalId",(req,res) => { projectController.DeleteProposal(req,res) });
//projectRouter.get("/f/:projectId",(req,res) => { projectController.FindAvailableEmployees(req,res) });


export default projectRouter;