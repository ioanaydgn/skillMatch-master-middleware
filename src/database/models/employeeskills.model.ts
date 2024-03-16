import mongoose, {Schema} from "mongoose";

const employeeSkillsSchema = new mongoose.Schema({
    employeeSkillId: "string",
    skillLevel: { type: String, required: true},
    skillExperience: { type: String, required: true},
    skillId: { type: Schema.Types.String, ref: 'skills' ,required: true },
    userId: { type: Schema.Types.String, ref: 'users' ,required: true },
});

const EmployeeSkills = mongoose.model("employeeskills", employeeSkillsSchema);
export default EmployeeSkills;