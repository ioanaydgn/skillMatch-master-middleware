import departmentController from "controllers/v1/department.controller";
import { Router } from "express";
import { authToken } from "middlewares";
let departmentRouter = Router();


departmentRouter.post("/" ,(req, res) => departmentController.CreateDepartment(req, res));
departmentRouter.delete("/:departmentId" ,(req, res) => departmentController.DeleteDepartment(req, res));
departmentRouter.put("/:departmentId" ,(req, res) => departmentController.UpdateDepartment(req, res));
departmentRouter.put("/d/:departmentId" ,(req, res) => departmentController.AssignDepartmentManager(req, res));
export default departmentRouter;