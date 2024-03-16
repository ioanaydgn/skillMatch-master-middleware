import mongoose, { Schema } from "mongoose";

const ProposalSchema = new mongoose.Schema({
  projectId: { type: Schema.Types.String, ref: "projects", required: true },
  memberId: { type: Schema.Types.String, ref: "users", required: true },
  workHours: { type: Number, required: true },
  roles: [{ type: String, required: true }],
  comments: { type: String, required: true },
});
const Proposal = mongoose.model("proposal", ProposalSchema);
export default Proposal;
