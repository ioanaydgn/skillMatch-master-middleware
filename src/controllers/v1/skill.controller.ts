import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { Department, Skill, User, EmployeeSkills } from "@models";

class skillController {
  internalError: string = "Internal server error";
  functionName: string = "";

  // Create a new skill endpoint
  public CreateSkill = async (req: Request, res: Response) => {
    this.functionName = "createSkill";
    try {
      const { departmentId, skillName, skillAuthor, skillCategory } = req.body;

      // Check if departmentId & skillName are provided
      if (!departmentId || !skillName || !skillAuthor || !skillCategory) {
        return res
          .status(400)
          .send(
            "departmentId, skillName, skillAuthor and skillCategory are required"
          );
      }

      // Find the department by its ID
      let department = await Department.findOne({ departmentId });
      if (!department) {
        return res.status(404).send("Department not found");
      }

      // Check if skill with the same name already exists
      let existingSkill = await Skill.findOne({ departmentId, skillName });
      if (existingSkill) {
        return res.status(400).send("Skill already exists");
      }

      // Create a new skill object
      const newSkill = new Skill({
        skillId: uuidv4(),
        skillName,
        skillAuthor,
        skillCategory,
        departmentId: department.departmentId,
      });

      // Save the new skill to the database
      await newSkill.save();

      // Respond with success message and skill details
      res.status(200).send({
        status: 200,
        message: "Skill created successfully",
        data: newSkill,
      });
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(500).send(this.internalError);
    }
  };

  // Delete an existing skill endpoint
  public DeleteSkill = async (req: Request, res: Response) => {
    this.functionName = "deleteSkill";
    try {
      const { skillId } = req.params;

      // Check if skillId is provided
      if (!skillId) {
        return res.status(400).send("Skill ID is required");
      }

      // Find the skill by its ID and delete it
      let skill = await Skill.findOneAndDelete({ skillId });
      if (!skill) {
        return res.status(404).send("Skill not found");
      }

      // Check if the skill exists
      if (!skill) {
        return res.status(404).send("Skill not found");
      }

      // Respond with success message
      res.status(200).send({
        status: 200,
        message: "Skill deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(500).send(this.internalError);
    }
  };

  // Update an existing skill endpoint
  public UpdateSkill = async (req: Request, res: Response) => {
    this.functionName = "updateSkill";

    try {
      let { skillId } = req.params;
      let { skillName, skillAuthor, skillCategory } = req.body;

      if (!skillId) {
        return res.status(400).send("Skill ID is required");
      }
      if (!skillName) {
        return res.status(400).send("Skill Name is required");
      }
      if (!skillAuthor) {
        return res.status(400).send("Skill Author is required");
      }
      if (!skillCategory) {
        return res.status(400).send("Skill Category is required");
      }
      let skill = await Skill.findOne({ skillId });
      if (!skill) {
        return res.status(404).send("Skill not found");
      }

      let existingSkill = await Skill.findOne({ skillName });
      if (existingSkill && existingSkill.skillId !== skill.skillId) {
        return res.status(400).send("Skill already exists");
      }

      // Update the skill details
      skill.skillName = skillName;
      skill.skillAuthor = skillAuthor;
      skill.skillCategory = skillCategory;

      // Save the updated skill to the database
      await skill.save();

      // Respond with success message
      res.status(200).send({
        status: 200,
        message: "Skill updated successfully",
        data: skill,
      });
    } catch (error) {
      console.error("Error updating skill:", error);
      res.status(500).send(this.internalError);
    }
  };

  // Get all skills endpoint
  public GetAllSkills = async (req: Request, res: Response) => {
    this.functionName = "getAllSkills";

    try {
      let skills = await Skill.find({
        organizationId: req.params.organizationId,
      });
      if (!skills) {
        return res.status(404).send("Skills not found");
      }

      let filteredSkills = skills.map((skill) => {
        return {
          skillId: skill.skillId,
          skillName: skill.skillName,
          skillAuthor: skill.skillAuthor,
          skillCategory: skill.skillCategory,
          departmentId: skill.departmentId,
        };
      });

      return res.status(200).send(filteredSkills); // Sadece filteredUsers'ı gönder
    } catch (error) {
      console.error("Error getting skills:", error);
      res.status(500).send(this.internalError);
    }
  };

  // get a skill by id endpoint
  public GetSkillById = async (req: Request, res: Response) => {
    this.functionName = "getSkillById";

    try {
      let skill = await Skill.findOne({ skillId: req.params.skillId });
      if (!skill) {
        return res.status(404).send("Skill not found");
      }

      let filteredSkill = {
        skillId: skill.skillId,
        skillName: skill.skillName,
        skillAuthor: skill.skillAuthor,
        skillCategory: skill.skillCategory,
        departmentId: skill.departmentId,
      };

      return res.status(200).send(filteredSkill); // Sadece filteredUsers'ı gönder
    } catch (error) {
      console.error("Error getting skill:", error);
      res.status(500).send(this.internalError);
    }
  };

  //[Skill-02] Skill Assignment
  public AssignSkill = async (req: Request, res: Response) => {
    this.functionName = "assignSkill";
    try {
      let { userId, skillId, skillLevel, skillExperience } = req.body;

      // Check if userId, skillId, skillLevel, and skillExperience are provided
      if (!userId || !skillId || !skillLevel || !skillExperience) {
        return res
          .status(400)
          .send(
            "userId, skillId, skillLevel, and skillExperience are required"
          );
      }

      // Check if user exists
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Check if skill exists
      const skill = await Skill.findOne({ skillId });
      if (!skill) {
        return res.status(404).send("Skill not found");
      }

      // Create a new skill assignment
      const newAssignment = new EmployeeSkills({
        employeeSkillId: uuidv4(),
        skillId: skill.skillId,
        userId: user.userId,
        skillLevel,
        skillExperience,
      });

      // Save the new skill assignment to the database
      await newAssignment.save();

      // Respond with success message and assignment details
      res.status(200).send({
        status: 200,
        message: "Skill assigned successfully",
        data: newAssignment,
      });
    } catch (error) {
      console.error("Error assigning skill:", error);
      res.status(500).send(this.internalError);
    }

    /*
  Any user from an organization (employees, admins, managers) should be able to assign himself/herself a
  set of skills. When assigning a skill, they should specify:
   Skill
   Level
      o One of: 1 – Learns, 2 – Knows, 3 – Does, 4 – Helps, 5 – Teaches
   Experience
      o One of: 0-6 months, 6-12 months, 1-2 years, 2-4 years, 4-7 years, >7 years
  Besides assigning skills, a user should be able to see the list with all skills that they have.
  */
  };

  // View Assigned Skills Endpoint
  public ViewAssignedSkills = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      // Check if userId is provided
      if (!userId) {
        return res.status(400).send("userId is required");
      }

      // Fetch assigned skills for the user
      const assignedSkills = await EmployeeSkills.find({ userId });

      // Respond with the list of assigned skills
      res.status(200).send({
        status: 200,
        message: "Assigned skills retrieved successfully",
        data: assignedSkills,
      });
    } catch (error) {
      console.error("Error fetching assigned skills:", error);
      res.status(500).send("Internal server error");
    }
  };
}

export default new skillController();
