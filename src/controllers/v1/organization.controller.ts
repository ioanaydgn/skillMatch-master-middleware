import { Request, Response } from "express";
import { Project, Organization, User } from "@models";

class OrganizationController {
  internalError: string = "Internal server error";
  functionName: string = "";

  // Give all information about the organization
  public GetOrganization = async (req: Request, res: Response) => {
    this.functionName = "getOrganization";
    try {
      let organizationName = req.params.organizationName;
      let usersInSameOrganization = await User.find({
        organizationName
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
}

export default new OrganizationController();
