import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { Project, Organization, Team, User, Proposal } from "@models";
import cors from "cors";

class ProjectController {
  internalError: string = "Internal server error";
  functionName: string = "";
  // Create a new project endpoint
  public CreateProject = async (req: Request, res: Response) => {
    try {
      const {
        projectName,
        projectPeriod,
        projectStartDate,
        projectDeadline,
        projectStatus,
        projectDescription,
        technologyStack,
        customRolesId,
        organizationId,
      } = req.body;

      // Check if organizationId is provided
      if (!organizationId) {
        return res.status(400).send("organizationId is required");
      }

      // Find the organization by its ID
      const organization = await Organization.findOne({ organizationId });
      if (!organization) {
        return res.status(404).send("Organization not found");
      }

      // Check if project with the same name already exists
      const existingProject = await Project.findOne({ projectName });
      if (existingProject) {
        return res.status(400).send("Project already exists");
      }

      // Create a new project object
      const newProject = new Project({
        projectId: uuidv4(),
        projectName,
        projectPeriod,
        projectStartDate,
        projectDeadline,
        projectStatus,
        projectDescription,
        technologyStack,
        customRolesId,
        organizationId: organization.organizationId, // Assign the organization ID
      });

      // Save the new project to the database
      await newProject.save();

      // Respond with success message and project details
      return res.status(201).json({
        status: 201,
        message: "Project created successfully",
        data: newProject,
      });
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).send("Internal server error");
    }
  };

  // Delete a project endpoint
  public DeleteProject = async (req: Request, res: Response) => {
    this.functionName = "deleteProject";

    try {
      const { projectId } = req.params;

      // Check if projectId is provided
      if (!projectId) {
        return res.status(400).send("projectId is required");
      }

      // Find the project by its ID
      const project = await Project.findOne({ projectId });
      if (!project) {
        return res.status(404).send("Project not found");
      }

      // Delete the project from the database
      const deletedProject = await Project.findOneAndDelete({
        projectId,
      });

      // Respond with success message
      return res.status(200).send({
        status: 200,
        message: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).send("Internal server error");
    }
  };
  // Update project information endpoint
  public UpdateProject = async (req: Request, res: Response) => {
    this.functionName = "updateProject";

    try {
      const { projectId } = req.params;
      const {
        projectName,
        projectPeriod,
        projectStartDate,
        projectDeadline,
        projectStatus,
        projectDescription,
        technologyStack,
        customRolesId,
        organizationId,
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

      // Update the project information
      const updatedProject = await Project.findOneAndUpdate(
        { projectId },
        {
          projectName,
          projectPeriod,
          projectStartDate,
          projectDeadline,
          projectStatus,
          projectDescription,
          technologyStack,
          customRolesId,
          organizationId,
        },
        { new: true }
      );

      // Respond with success message and updated project details
      return res.status(200).json({
        status: 200,
        message: "Project updated successfully",
        data: updatedProject,
      });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Find Available Employees Endpoint
  public FindAvailableEmployees = async (req: Request, res: Response) => {
    try {
      const {
        projectId,
        partiallyAvailable,
        closeToFinishWeeks,
        includeUnavailable,
      } = req.body;

      // Query based on the provided criteria
      let query: any = { projectId };

      if (!partiallyAvailable) {
        query.workHours = { $lt: 8 };
      }

      if (
        closeToFinishWeeks &&
        closeToFinishWeeks >= 2 &&
        closeToFinishWeeks <= 6
      ) {
        const maxDeadline = new Date();
        maxDeadline.setDate(maxDeadline.getDate() + closeToFinishWeeks * 7); // Convert weeks to days
        query.projectDeadline = { $lte: maxDeadline };
      }

      if (!includeUnavailable) {
        query.workHours = { $eq: 0 };
      }

      const availableEmployees = await Team.find(query);

      return res.status(200).json({
        status: 200,
        message: "Available Employees found",
        data: availableEmployees,
      });
    } catch (error) {
      console.error("Error finding available employees:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Get Project by ID endpoint
  public GetProjectById = async (req: Request, res: Response) => {
    this.functionName = "getProjectById";

    try {
      const { projectId } = req.params;

      // Check if projectId is provided
      if (!projectId) {
        return res.status(400).send("projectId is required");
      }

      // Find the project by its ID
      const project = await Project.findOne({ projectId });
      if (!project) {
        return res.status(404).send("Project not found");
      }

      // Respond with success message and project details
      return res.status(200).json({
        status: 200,
        message: "Project found",
        data: project,
      });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Propose people for a project endpoint
  public ProposeProjectAssignment = async (req: Request, res: Response) => {
    try {
      const { projectId, userId, workHours, roles, comments } = req.body;

      //memberId is the user id
      //projectId is the project id
      //workHours is the number of hours the user has worked on the project
      //roles is an array of roles that the user is assigned to
      //comments is a comment that the user has made on the project

      // Check if projectId is provided
      if (!projectId) {
        return res.status(400).send("projectId is required");
      }

      // Check if memberId is provided
      if (!userId) {
        return res.status(400).send("memberId is required");
      }

      // Check if workHours is provided
      if (!workHours) {
        return res.status(400).send("workHours is required");
      }

      // Check if roles is provided
      if (!roles) {
        return res.status(400).send("roles is required");
      }

      // Check if comments is provided

      // Validate work hours
      if (isNaN(workHours) || workHours < 1 || workHours > 8) {
        return res
          .status(400)
          .json({ status: 400, message: "Invalid work hours" });
      }

      // Validate roles (assuming roles is an array of strings)
      if (
        !Array.isArray(roles) ||
        roles.some((role) => typeof role !== "string")
      ) {
        return res.status(400).json({ status: 400, message: "Invalid roles" });
      }

      // Validate other details as required

      // Create proposal object
      const proposal = new Proposal({
        proposalId: uuidv4(),
        projectId,
        memberId: userId,
        workHours,
        roles,
        comments,
        // You may need to add other fields according to your schema
      });

      // Save proposal to the database
      await proposal.save();

      return res.status(200).json({
        status: 200,
        message: "Assignment proposal submitted successfully",
        proposal: proposal, // If you want to return the proposal object for reference
      });
    } catch (error) {
      console.error("Error proposing project assignment:", error);
      return res.status(500).send("Internal server error");
    }
  };

  // Delete Proposal
  public DeleteProposal = async (req: Request, res: Response) => {
    this.functionName = "deleteProposal";
    try {
      let { proposalId } = req.params;
      // Check if proposalId is provided
      if (!proposalId) {
        return res.status(400).send("proposalId is required");
      }

      // Find the project by its ID
      const proposal = await Proposal.findOne({ proposalId });
      if (!proposal) {
        return res.status(404).send("Proposal not found");
      }

      // Delete the proposal from the database
      const deletedProject = await Proposal.findOneAndDelete({
        proposalId,
      });

      // Respond with success message
      return res.status(200).send({
        status: 200,
        message: "Proposal deleted successfully",
      });
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).send("Internal server error");
    }
  };

  // View Assignment Proposals Endpoint
  public ViewAssignmentProposals = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;

      // Validate projectId
      if (!projectId) {
        return res.status(400).send("projectId is required");
      }

      // Retrieve all proposals for the organization
      const proposals = await Proposal.find({ projectId });

      // If no proposals found, return a 204 (No Content) status
      if (!proposals.length) {
        return res.status(204).send();
      }

      // Return the retrieved proposals
      return res.status(200).json({ proposals });
    } catch (error) {
      console.error("Error retrieving assignment proposals:", error);
      return res.status(500).send("Internal server error");
    }
  };
}
export default new ProjectController();
