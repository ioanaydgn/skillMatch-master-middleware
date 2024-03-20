import organizationController from "controllers/v1/organization.controller";
import { Router } from "express";
import { authToken } from "middlewares";

let organizationRouter = Router();

organizationRouter.get("/:organizationName",(req,res) => organizationController.GetOrganization(req,res));
organizationRouter.get("/o/:organizationId",(req,res) => organizationController.GetDepartmentInOrganization(req,res));
organizationRouter.get("/p/:organizationId",(req,res) => organizationController.GetProjectInOrganization(req,res));
organizationRouter.get("/v/:organizationName",(req,res) => organizationController.GetOrganizationId(req,res));
organizationRouter.get("/s/:organizationId",(req,res) => organizationController.GetSkillsInOrganization(req,res));
organizationRouter.get("/u/:url",(req,res) => organizationController.GetUrlToOrganizationID(req,res));

export default organizationRouter;