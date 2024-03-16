import { Request, Response } from "express";
import { User, CustomRoles, Organization } from "@models";
import { v4 as uuidv4 } from "uuid";

class CustomRoleController {
    internalError: string = "Internal server error";
    functionName: string = "";

    // Create a new custom role endpoint
    public CreateCustomRole = async (req: Request, res: Response) => {
        this.functionName = "createCustomRole";
        try {
            const { organziationId,customRoleName, userId, customRoleAuthor } = req.body;

            // Check if customRoleId & customRoleName are provided
            if (!organziationId || !customRoleName || !userId || !customRoleAuthor) {
                return res.status(400).send("organziationId , customRoleName , userId & customRoleAuthor are required");
            }
            

            // Check if custom role with the same name already exists
            let existingCustomRole = await CustomRoles.findOne({ customRoleName });
            if (existingCustomRole) {
                return res.status(400).send("Custom Role already exists");
            }

            // Check if user with the same id already exists
            let existingUser = await User.findOne({ userId });
            if (existingUser && existingUser.userId!== userId) {
                return res.status(400).send("User already exists");
            }

            // Create a new custom role object
            const newCustomRole = new CustomRoles({
                customRoleName,
                customRoleId: uuidv4(),
                organziationId: organziationId,
                userId,
                customRoleAuthor,
            });

            console.log(newCustomRole);
            // Save the new custom role to the database
            await newCustomRole.save();

            // Respond with success message
            res.status(201).send({
                status: 201,
                message: "Custom Role created successfully",
                data: newCustomRole,
            });
        } catch (error) {
            console.error("Error creating custom role:", error);
            res.status(500).send(this.internalError);
        }
    };

    public DeleteCustomRole = async (req: Request, res: Response) => {
        this.functionName = "deleteCustomRole";
        try{
            const { customRoleId } = req.params;

            // Check if customRoleId is provided
            if (!customRoleId) {
                return res.status(400).send("customRoleId is required");
            }

            // Find the custom role by its ID and Delete
            const customRole = await CustomRoles.findOneAndDelete({ customRoleId });
            if (!customRole) {
                return res.status(404).send("Custom Role not found");
            }
    
            // Respond with success message
            res.status(200).send({
                status: 200,
                message: "Custom Role deleted successfully",
                data: customRole,
            });
        } catch (error) {
            console.error("Error deleting custom role:", error);
            res.status(500).send(this.internalError);
        }
    };

    public UpdateCustomRole = async (req: Request, res: Response) => {
        this.functionName = "updateCustomRole";
        try{ 
            const { customRoleId } = req.params;
            const { customRoleName, customRoleAuthor } = req.body;

            // Check if customRoleId & customRoleName are provided
            if (!customRoleId ||!customRoleName ||!customRoleAuthor) {
                return res.status(400).send("customRoleId & customRoleName & customRoleAuthor are required");
            }

            // Find the custom role by its ID
            const customRole = await CustomRoles.findOne({ customRoleId });
            if (!customRole) {
                return res.status(404).send("Custom Role not found");
            }

            // Check if custom role with the same name already exists
            let existingCustomRole = await CustomRoles.findOne({ customRoleName });
            if (existingCustomRole && existingCustomRole.customRoleId!== customRoleId) {
                return res.status(400).send("Custom Role already exists");
            }
        } catch (err) {
            console.error("Error updating custom role:", err);
            res.status(500).send(this.internalError);
        }
    };

    // Get all custom roles by organizationID endpoint
    public GetAllCustomRoles = async (req: Request, res: Response) => {
        this.functionName = "getAllCustomRoles";
        try {
            const { organizationId } = req.params;

            // Check if organizationId is provided
            if (!organizationId) {
                return res.status(400).send("organizationId is required");
            }

            // Find all custom roles by organizationId
            const customRoles = await CustomRoles.find({ organziationId: organizationId });

            // Respond with success message
            res.status(200).send({
                status: 200,
                message: "Custom Roles retrieved successfully",
                data: customRoles,
            });
        } catch (error) {
            console.error("Error getting all custom roles:", error);
            res.status(500).send(this.internalError);
        }
    }

    // Get a custom role by ID endpoint
    public GetCustomRoleById = async (req: Request, res: Response) => {
        this.functionName = "getCustomRoleById";
        try {
            const { customRoleId } = req.params;

            // Check if customRoleId is provided
            if (!customRoleId) {
                return res.status(400).send("customRoleId is required");
            }

            // Find the custom role by its ID
            const customRole = await CustomRoles.findOne({ customRoleId });
            if (!customRole) {
                return res.status(404).send("Custom Role not found");
            }

            // Respond with success message
            res.status(200).send({
                status: 200,
                message: "Custom Role found successfully",
                data: customRole,
            });
        } catch (error) {
            console.error("Error finding custom role:", error);
            res.status(500).send(this.internalError);
        }
    }
}

export default new CustomRoleController();