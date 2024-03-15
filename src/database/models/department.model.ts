import mongoose, { Schema } from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentId: "string",
  departmentName: { type: String, required: true },
  organizationId: {
    type: Schema.Types.String,
    ref: "organizations",
    required: true,
  },
  managerId: { type: Schema.Types.String, ref: "users", required: false },
  memberIds: [{ type: Schema.Types.Array, ref: "users", required: false }]
});

const Department = mongoose.model("department", departmentSchema);
export default Department;
