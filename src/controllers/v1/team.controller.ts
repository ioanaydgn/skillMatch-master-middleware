import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { User, Project, Team, CustomRoles } from "@models";

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
        projectId,
        customRoleId,
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

      if (!customRoleId) {
        return res.status(400).send("customRoleId is required");
      }
      const customRole = await CustomRoles.findOne({ customRoleId });
      if (!customRole) {
        return res.status(404).send("Custom Role not found");
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
      // Find the team by its ID
      const team = await Team.findOne({ teamId });
      if (!team) {
        return res.status(404).send("Team not found");
      }

      const users = await User.find({ userId });
      if (!users || users.length === 0) {
        return res.status(404).send("User not found");
      }

      team.memberIds.push(userId);

      // Save the updated team to the database
      await team.save();
      // Respond with success message and team details
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

  // Get TeamId by ProjectId
  public GetTeamIdByProjectId = async (req: Request, res: Response) => {
    this.functionName = "getTeamIdByProjectId";
    try {
      const { projectId } = req.params;
      // Check if projectId is provided
      if (!projectId) {
        return res.status(400).send("projectId is required");
      }
      // Find the team by project ID
      const team = await Team.findOne({ projectId });
      if (!team) {
        return res.status(404).send("Team not found for the provided project");
      }
      // Respond with success message and team ID
      res.status(200).send({
        status: 200,
        message: "Team ID retrieved successfully",
        data: { teamId: team.teamId },
      });
    } catch (error) {
      console.error("Error retrieving team ID by project ID:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Get Team Members by TeamId
  public GetTeamMembersByTeamId = async (req: Request, res: Response) => {
    this.functionName = "getTeamMembersByTeamId";
    try {
      const { teamId } = req.params;

      // Check if teamId is provided
      if (!teamId) {
        return res.status(400).send("teamId is required");
      }
      // Find the team by its ID
      const team = await Team.findOne({ teamId });
      if (!team) {
        return res.status(404).send("Team not found");
      }

      // Respond with success message and memberIds
      res.status(200).send({
        status: 200,
        message: "Team members retrieved successfully",
        data: team.memberIds,
      });
    } catch (error) {
      console.error("Error retrieving team members:", error);
      res.status(500).send("Internal server error");
    }
  };

  // View Team by projectId
  public ViewTeamByProjectId = async (req: Request, res: Response) => {
    this.functionName = "viewTeamByProjectId";
    try {
      const { projectId } = req.params;

      // Check if projectId is provided
      if (!projectId) {
        return res.status(400).send("projectId is required");
      }
      // Find the team by project ID
      const team = await Team.find({ projectId });
      if (!team) {
        return res.status(404).send("Team not found for the provided project");
      }
      // Respond with success message and team details
      let fill = team.map((team) => {
        return {
          teamId: team.teamId,
          assignmentStatus: team.assignmentStatus,
          workHours: team.workHours,
          teamComments: team.teamComments,
          projectId: team.projectId,
          customTeamRolesId: team.customTeamRolesId,
          memberIds: team.memberIds,
        };
      });
      res.status(200).send({
        status: 200,
        message: "Team retrieved successfully",
        data: fill,
      });
    } catch (error) {
      console.error("Error retrieving team by project ID:", error);
      res.status(500).send("Internal server error");
    }
  };
}

export default new TeamController();
