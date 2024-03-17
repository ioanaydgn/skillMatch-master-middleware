import customroleController from "controllers/v1/customrole.controller";

import { Router } from "express";
import { authToken, roleConstraint } from "middlewares";

let customRoleRouter = Router();

customRoleRouter.post(
  "/create",
  roleConstraint("admin"),
  customroleController.CreateCustomRole
);
customRoleRouter.delete(
  "/:customRoleId",
  roleConstraint("admin"),
  customroleController.DeleteCustomRole
);
customRoleRouter.put(
  "/:customRoleId",
  roleConstraint("admin"),
  customroleController.UpdateCustomRole
);
customRoleRouter.get(
  "/:customRoleId",
  roleConstraint("employee"),
  customroleController.GetCustomRoleById
);
customRoleRouter.get(
  "/organization/:organizationId",
  roleConstraint("manager"),
  customroleController.GetAllCustomRoles
);

export default customRoleRouter;
