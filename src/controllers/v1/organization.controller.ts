import { Request, Response } from "express";
import { Organization, User, Department, Project } from "@models";

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

  // Give organizationId by organizationName
  public GetOrganizationId = async (req: Request, res: Response) => {
    this.functionName = "getOrganizationId";
    try {
      let organizationName = req.params.organizationName;
      let organization = await Organization.findOne({
        organizationName,
      });

      if (!organization) {
        return res.status(404).send("Organization not found");
      }

      return res.status(200).send({
        organizationId: organization.organizationId,
      });
    } catch (error) {
      console.error("Error getting organizationId:", error);
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

  // Give all projects about the organization
  public GetProjectInOrganization = async (req: Request, res: Response) => {
    this.functionName = "getProjectInOrganization";
    try {
      let organizationId = req.params.organizationId;
      if (!organizationId) {
        return res.status(400).send("Organization ID is required");
      }

      let projectsInOrganization = await Project.find({ organizationId });
      if (!projectsInOrganization) {
        return res.status(404).send("Organization not found");
      }

      let filteredOrganization = projectsInOrganization.map((project) => {
        return {
          projectId: project.projectId,
          projectName: project.projectName,
          projectPeriod: project.projectPeriod,
          projectStartDate: project.projectStartDate,
          projectDeadline: project.projectDeadline,
          projectStatus: project.projectStatus,
          projectDescription: project.projectDescription,
          technologyStack: project.technologyStack,
          customRolesId: project.customRolesId,
          organizationId: project.organizationId,
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
