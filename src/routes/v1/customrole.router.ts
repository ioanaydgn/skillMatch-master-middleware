import customroleController from "controllers/v1/customrole.controller";
import { Router } from "express";
import { authToken } from "middlewares";

let customRoleRouter = Router();


customRoleRouter.post("/create" ,(req, res) => customroleController.CreateCustomRole(req, res));


export default customRoleRouter;