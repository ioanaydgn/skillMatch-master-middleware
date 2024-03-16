import customroleController from "controllers/v1/customrole.controller";
import { Router } from "express";
import { authToken } from "middlewares";

let customRoleRouter = Router();


customRoleRouter.post("/create" ,(req, res) => customroleController.CreateCustomRole(req, res));
customRoleRouter.delete("/:customRoleId" ,(req, res) => customroleController.DeleteCustomRole(req, res));
customRoleRouter.put("/:customRoleId" ,(req, res) => customroleController.UpdateCustomRole(req, res));
customRoleRouter.get("/:customRoleId",(req, res) => customroleController.GetCustomRoleById(req, res));
customRoleRouter.get("/o/:organizationId",(req, res) => customroleController.GetAllCustomRoles(req, res));


export default customRoleRouter;