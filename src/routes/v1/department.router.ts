import departmentController from "controllers/v1/department.controller";
import { Router } from "express";
import { authToken } from "middlewares";
let departmentRouter = Router();


departmentRouter.post("/create" ,(req, res) => departmentController.CreateDepartment(req, res));
departmentRouter.delete("/:departmentId" ,(req, res) => departmentController.DeleteDepartment(req, res));
departmentRouter.put("/:departmentId" ,(req, res) => departmentController.UpdateDepartment(req, res));
departmentRouter.get("/:departmentId",(req, res) => departmentController.GetDepartment(req, res));
departmentRouter.post("/assign-department-manager" ,(req, res) => departmentController.AssignDepartmentManager(req, res));
departmentRouter.post("/assign-department-members",(req, res) => departmentController.AssignDepartmentMembers(req, res));
export default departmentRouter;