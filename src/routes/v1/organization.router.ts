import organizationController from "controllers/v1/organization.controller";
import { Router } from "express";
import { authToken } from "middlewares";

let organizationRouter = Router();

organizationRouter.get("/:organizationName",(req,res) => organizationController.GetOrganization(req,res));
organizationRouter.get("/o/:organizationId",(req,res) => organizationController.GetDepartmentInOrganization(req,res));
export default organizationRouter;