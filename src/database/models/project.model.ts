import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema({
  projectId: "string",
  projectName: { type: String, required: true },
  projectPeriod: {type : String, required: true},
  projectStartDate: {type : String, required: true},
  projectDeadline: {type : String, required: false},
  projectStatus: {type : String, required: true},
  projectDescription: {type : String, required: true},
  technologyStack: [{ type: String ,required: true}], 
  customRolesId: { type: Schema.Types.String, ref: 'customteamroles' ,required: false },
  organizationId: { type: Schema.Types.String, ref: 'organizations' ,required: true },
});

const Project = mongoose.model("project", projectSchema);
export default Project;