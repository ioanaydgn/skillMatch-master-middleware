import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { User, Project, Team, CustomRoles } from "@models";

class TeamController {
  internalError: string = "Internal server error";
  functionName: string = "";

  // Create a new team endpoint
  public CreateTeam = async (req: Request, res: Response) => {
    this.functionName = "createTeam";
    try {
      let { assignmentStatus, workHours, teamComments, projectId, memberIds, customRoleId } =
        req.body;

      // Check if projectId is provided
      if (!projectId) {
        return res.status(400).send("projectId is required");
      }

      // Find the project by its ID
      const project = await Project.findOne({ projectId });
      if (!project) {
        return res.status(404).send("Project not found");
      }

      if(!customRoleId){
        return res.status(400).send("customRoleId is required");
      }
      const customRole = await CustomRoles.findOne({ customRoleId });
      if (!customRole) {
        return res.status(404).send("Custom Role not found");
      }

      // Check if memberIds is provided
      if (!memberIds || memberIds.length === 0) {
        return res.status(400).send("At least one memberId is required");
      }


      // Create a new team object
      const newTeam = new Team({
        teamId: uuidv4(),
        assignmentStatus,
        workHours,
        teamComments,
        projectId: project.projectId,
        customTeamRolesId: customRole.customRoleId,
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
  };

  // Assign Team Members Endpoint
  public AssignTeamMembers = async (req: Request, res: Response) => {
    this.functionName = "assignTeamMembers";
    try {
      const { teamId, userId } = req.body;
      // Check if teamid and userIds are provided
      if (!teamId || !userId) {
        return res.status(400).send("Team ID and User IDs are required");
      }
      // Find the department by its ID
      const team = await Team.findOne({ teamId });
      if (!team) {
        return res.status(404).send("Team not found");
      }
      // Find the users by their IDs
      const users = await User.find({ userId });
      if (!users || users.length === 0) {
        return res.status(404).send("Users not found");
      }
      // Assign the team members
      team.memberIds = userId;
      // Save the updated department to the database
      await team.save();
      // Respond with success message and department details
      res.status(200).send({
        status: 200,
        message: "Team members assigned successfully",
        data: team,
      });
    } catch (error) {
      console.error("Error assigning team members:", error);
      res.status(500).send("Internal server error");
    }
  };
}

export default new TeamController();
