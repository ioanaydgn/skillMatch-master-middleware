import { Request, Response } from "express";
import { Organization, User, Department } from "@models";

class OrganizationController {
  internalError: string = "Internal server error";
  functionName: string = "";

  // Give all information about the organization
  public GetOrganization = async (req: Request, res: Response) => {
    this.functionName = "getOrganization";
    try {
      let organizationName = req.params.organizationName;
      let usersInSameOrganization = await User.find({
        organizationName,
      });

      let filteredUsers = usersInSameOrganization.map((user) => {
        return {
          userId: user.userId,
          name: user.name,
          email: user.email,
          accountType: user.accountType,
          employeeSkillsId: user.employeeSkillsId,
        };
      });

      return res.status(200).send(filteredUsers); // Sadece filteredUsers'ı gönder
    } catch (error) {
      console.error("Error getting organization:", error);
      res.status(500).send(this.internalError);
    }
  };
  // Give all department about the organization
  public GetDepartmentInOrganization = async (req: Request, res: Response) => {
    this.functionName = "getDepartmentInOrganization";
    try {
      let organizationId = req.params.organizationId;
      if (!organizationId) {
        return res.status(400).send("Organization ID is required");
      }

      let departmentsInOrganization = await Department.find({ organizationId });
      if (!departmentsInOrganization) {
        return res.status(404).send("Organization not found");
      }

      let filteredOrganization = departmentsInOrganization.map((department) => {
        return {
          departmentId: department.departmentId,
          departmentName: department.departmentName,
          organizationId: department.organizationId,
          managerId: department.managerId,
        };
      });

      return res.status(200).send(filteredOrganization); // Sadece filteredUsers'ı gönder
    } catch (error) {
      console.error("Error getting organization:", error);
      res.status(500).send(this.internalError);
    }
  };
}

export default new OrganizationController();
