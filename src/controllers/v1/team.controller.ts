import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { User, Project, Team, CustomRoles} from "@models";

class TeamController {
    internalError: string = "Internal server error";
    functionName: string = "";

    // Create a new team endpoint
    public CreateTeam = async (req: Request, res: Response) => {
        this.functionName = "createTeam";
        try {
          let {
            assignmentStatus,
            workHours,
            teamComments,
            customRoleId,
            projectId,
            memberIds
          } = req.body;
      
          // Check if projectId is provided
          if (!projectId) {
            return res.status(400).send("projectId is required");
          }
      
          // Find the project by its ID
          const project = await Project.findOne({ projectId });
          if (!project) {
            return res.status(404).send("Project not found");
          }
      
          // Check if customTeamRolesId is provided
          if (!customRoleId) {
            return res.status(400).send("customTeamRolesId is required");
          }
      
          // Find the customTeamRoles by its ID
          const customTeamRoles = await CustomRoles.findOne({ customRoleId });
          if (!customTeamRoles) {
            return res.status(404).send("Custom team roles not found");
          }
      
          // Check if memberIds is provided
          if (!memberIds || memberIds.length === 0) {
            return res.status(400).send("At least one memberId is required");
          }
      
          // Find the users by their IDs
          const members = await User.find({ _id: { $in: memberIds } });
          if (!members || members.length !== memberIds.length) {
            return res.status(404).send("One or more members not found");
          }
      
          // Create a new team object
          const newTeam = new Team({
            teamId: uuidv4(),
            assignmentStatus,
            workHours,
            teamComments,
            customTeamRolesId: customTeamRoles.customRoleId,
            projectId: project.projectId,
            memberIds,
          });
      
          // Save the new team to the database
          await newTeam.save();
      
          // Respond with success message and team details
          return res.status(201).json({
            status: 201,
            message: "Team created successfully",
            data: newTeam,
          });
        } catch (error) {
          console.error("Error creating team:", error);
          return res.status(500).send("Internal server error");
        }
      }
}

export default new TeamController();