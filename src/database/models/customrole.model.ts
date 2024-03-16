import mongoose, { Schema } from "mongoose";

const customRolesSchema = new mongoose.Schema({
  customRoleId: "string",
  customRoleName: { type: String, required: true },
  customRoleAuthor: { type: String, required: true },
  userId: { type: Schema.Types.Array, ref: "users", required: true },
  organziationId: {
    type: Schema.Types.String,
    ref: "organizations",
    required: true,
  },
});

const CustomRoles = mongoose.model("customteamroles", customRolesSchema);
export default CustomRoles;
