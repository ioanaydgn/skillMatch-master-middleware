import skillController from "controllers/v1/skill.controller";
import { Router } from "express";
import { authToken } from "middlewares";

let skillRouter = Router();

skillRouter.post("/create" ,(req, res) => skillController.CreateSkill(req, res));
skillRouter.delete("/:skillId" ,(req, res) => skillController.DeleteSkill(req, res));
skillRouter.put("/:skillId" ,(req, res) => skillController.UpdateSkill(req, res));
skillRouter.get("/all/:departmentId",(req, res) => skillController.GetAllSkills(req, res));
skillRouter.post("/AssignSkill",(req, res) => skillController.AssignSkill(req, res));
skillRouter.get("/u/:userId",(req, res) => skillController.ViewAssignedSkills(req, res));
skillRouter.get("/:skillId",(req, res) => skillController.GetSkillById(req, res));
export default skillRouter;