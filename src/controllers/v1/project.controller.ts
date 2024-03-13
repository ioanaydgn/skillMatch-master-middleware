import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { Project, Organization } from "@models";
import cors from "cors";
import Team from "database/models/team.model";

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
        organizationId: organization._id, // Assign the organization ID
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
    //Implement an endpoint to allow Project Managers to find available employees for a project based on specified criteria.
    this.functionName = "findAvailableEmployees";
    try {
      let { projectId } = req.body;
      
      let availableEmployees = await Team.find({ projectId:projectId});
      
      return res.status(200).json({
        status: 200,
        message: "Available Employees found",
        data: availableEmployees,
      });




    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).send("Internal server error");
    }

  }

}
export default new ProjectController();
