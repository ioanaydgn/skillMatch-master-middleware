import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    enum: ["admin", "employee", "projectManager", "departmentManager"],
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    default: [],
  },
});
const Role = mongoose.model("role", roleSchema);
export default Role;
