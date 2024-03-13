import mongoose, { Schema } from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentId: "string",
  departmentName: { type: String, required: true },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: "organizations",
    required: true,
  },
  managerId: { type: Schema.Types.ObjectId, ref: "users", required: true }
});

const Department = mongoose.model("department", departmentSchema);
export default Department;
