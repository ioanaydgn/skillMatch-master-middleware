import mongoose, {Schema} from "mongoose";

const skillSchema = new mongoose.Schema({
    skillId: "string",
    skillName: { type: String, required: true },
    skillCategory: { type: String, required: true },
    skillAuthor: { type: Schema.Types.String, ref: 'users', required: true},
    departmentId: { type: Schema.Types.String, ref: 'departments' ,required: true },
    organizationId: { type: Schema.Types.String, ref: 'organizations', required: true },
});

const Skills = mongoose.model("skills", skillSchema);
export default Skills;