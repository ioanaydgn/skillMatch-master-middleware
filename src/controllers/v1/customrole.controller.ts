import { Request, Response } from "express";
import { User, CustomRoles } from "@models";
import {v4 as  uuidv4} from "uuid";

class CustomRoleController {
    internalError: string = "Internal server error";
    functionName: string = "";

    // Create a new custom role endpoint
    public CreateCustomRole = async (req: Request, res: Response) => {
        this.functionName = "createCustomRole";
        try {
            let customRoleId = req.params.organizationId;
            const { customRolesId, customRoleName, userId, customRoleAuthor } = req.body;

            // Check if customRoleId & customRoleName are provided
            if (!customRoleId || !customRoleName || !customRoleName || !userId || !customRoleAuthor) {
                return res.status(400).send("customRoleId , customRoleName , userId & customRoleAuthor are required");
            }

            // Find the custom role by its ID
            let customRole = await CustomRoles.findOne({ customRolesId });
            if (!customRole) {
                return res.status(404).send("Custom Role not found");
            }

            // Check if custom role with the same name already exists
            let existingCustomRole = await CustomRoles.findOne({ customRoleName });
            if (existingCustomRole && existingCustomRole.customRoleId!== customRole.customRoleId) {
                return res.status(400).send("Custom Role already exists");
            }

            // Check if user with the same id already exists
            let existingUser = await User.findOne({ userId });
            if (existingUser && existingUser.userId!== customRole.userId) {
                return res.status(400).send("User already exists");
            }

            // Create a new custom role object
            const newCustomRole = new CustomRoles({
                customRolesId: uuidv4(),
                customRoleName,
                userId,
                customRoleAuthor,
            });

            // Save the new custom role to the database
            await newCustomRole.save();

            // Respond with success message
            res.status(200).send({
                status: 200,
                message: "Custom Role created successfully",
                data: newCustomRole,
            });
        } catch (error) {
            console.error("Error creating custom role:", error);
            res.status(500).send(this.internalError);
        }
    };
}

export default new CustomRoleController();