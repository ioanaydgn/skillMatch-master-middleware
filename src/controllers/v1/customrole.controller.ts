import { Request, Response } from "express";
import { User, CustomRoles } from "@models";
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
}

export default new CustomRoleController();