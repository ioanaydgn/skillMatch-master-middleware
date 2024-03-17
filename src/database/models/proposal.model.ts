import mongoose, { Schema } from "mongoose";

const proposalSchema = new mongoose.Schema({
  proposalId: {type: "string"},
  projectId: { type: Schema.Types.String, ref: "projects", required: true },
  memberId: { type: Schema.Types.String, ref: "users", required: true },
  workHours: { type: Number, required: true },
  roles: [{ type: String, required: true }],
  comments: { type: String, required: true },
});
const Proposal = mongoose.model("proposal", proposalSchema);
export default Proposal;
