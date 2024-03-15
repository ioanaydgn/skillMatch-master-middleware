import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { Department, Organization, User } from "@models";
import cors from "cors";

class DepartmentController {
  internalError: string = "Internal server error";
  functionName: string = "";

  // Create a new department endpoint
  public CreateDepartment = async (req: Request, res: Response) => {
    try {
      const { departmentName, organizationId } = req.body;

      // Check if organizationId is provided
      if (!organizationId) {
        return res.status(400).send("organizationId is required");
      }

      // Find the organization by its ID
      const organization = await Organization.findOne({ organizationId });
      if (!organization) {
        return res.status(404).send("Organization not found");
      }

      // Check if department with the same name already exists within the organization
      const existingDepartment = await Department.findOne({
        organizationId,
        departmentName,
      });
      if (existingDepartment) {
        return res
          .status(400)
          .send("Department already exists within the organization");
      }

      // Create a new department object
      const newDepartment = new Department({
        departmentName,
        departmentId: uuidv4(), // Generate a unique department ID
        organizationId: organization.organizationId, // Assign the organization ID
      });

      // Save the new department to the database
      await newDepartment.save();

      // Respond with success message and department details
      return res.status(201).json({
        status: 201,
        message: "Department created successfully",
        data: newDepartment,
      });
    } catch (error) {
      console.error("Error creating department:", error);
      return res.status(500).send("Internal server error");
    }
  };

  // Delete an existing department endpoint
  public DeleteDepartment = async (req: Request, res: Response) => {
    this.functionName = "deleteDepartment";

    try {
      const { departmentId } = req.params;

      // Check if departmentId is provided
      if (!departmentId) {
        return res.status(400).send("Department ID is required");
      }

      // Find the department by its ID and delete it
      const deletedDepartment = await Department.findOneAndDelete({
        departmentId,
      });

      // Check if the department exists
      if (!deletedDepartment) {
        return res.status(404).send("Department not found");
      }

      // Respond with success message
      res.status(200).send({
        status: 200,
        message: "Department deleted successfully",
        data: deletedDepartment,
      });
    } catch (error) {
      console.error("Error deleting department:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Update department information for the specified departmentId
  public UpdateDepartment = async (req: Request, res: Response) => {
    this.functionName = "updateDepartment";

    try {
      const { departmentId } = req.params;
      const { departmentName, organizationId } = req.body;

      // Check if departmentId is provided
      if (!departmentId) {
        return res.status(400).send("Department ID is required");
      }

      // Find the department by its ID
      const department = await Department.findOne({ departmentId }); // Specify the type as Department
      if (!department) {
        return res.status(404).send("Department not found");
      }

      // Check if organizationId is provided
      if (!organizationId) {
        return res.status(400).send("organizationId is required");
      }

      // Find the organization by its ID
      const organization = await Organization.findOne({ organizationId }); // Specify the type as Organization
      if (!organization) {
        return res.status(404).send("Organization not found");
      }

      // Check if department with the same name already exists
      const existingDepartment = await Department.findOne({ departmentName });
      if (
        existingDepartment &&
        existingDepartment.departmentId !== department.departmentId
      ) {
        // Make sure to exclude the current department from the check
        return res.status(400).send("Department already exists");
      }

      // Update the department details
      department.departmentName = departmentName;
      department.organizationId = organization?.organizationId ?? ""; // Assuming organizationId is the MongoDB ObjectId

      // Save the updated department to the database
      await department.save();

      // Respond with success message and department details
      res.status(200).send({
        status: 200,
        message: "Department updated successfully",
        data: department,
      });
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Give all information about the department
  public GetDepartment = async (req: Request, res: Response) => {
    this.functionName = "getDepartment";

    try {
      const { departmentId } = req.params;

      // Check if departmentId is provided
      if (!departmentId) {
        return res.status(400).send("Department ID is required");
      }

      // Find the department by its ID
      const department = await Department.findOne({ departmentId });
      if (!department) {
        return res.status(404).send("Department not found");
      }

      // Respond with success message and department details
      res.status(200).send({
        status: 200,
        message: "Department retrieved successfully",
        data: department,
      });
    } catch (error) {
      console.error("Error retrieving department:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Assign Department Manager endpoint
  public AssignDepartmentManager = async (req: Request, res: Response) => {
    this.functionName = "assignDepartmentManager";

    try {
      let { departmentId, userId } = req.body;

      // Check if departmentId & userID are provided
      if (!departmentId || !userId) {
        return res.status(400).send("Department ID and User ID are required");
      }

      // Find the department by its ID
      let department = await Department.findOne({ departmentId });
      if (!department) {
        return res.status(404).send("Department not found");
      }

      // Find the user by its ID
      let user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Assign the department manager
      department.managerId = userId;

      // Save the updated department to the database
      await department.save();

      // Respond with success message and department details
      res.status(200).send({
        status: 200,
        message: "Department manager assigned successfully",
        data: department,
      });
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Assign Department Members Endpoint
  AssignDepartmentMembers = async (req: Request, res: Response) => {
    this.functionName = "assignDepartmentMembers";
  };
}

export default new DepartmentController();
