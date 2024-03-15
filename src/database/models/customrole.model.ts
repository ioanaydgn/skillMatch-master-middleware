import mongoose, {Schema} from "mongoose";

const customRolesSchema = new mongoose.Schema({
    customRolesId: "string",
    customRoleName: { type: String, required: true },
    customRoleAuthor: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' ,required: true },
});

const CustomRoles = mongoose.model("customteamroles", customRolesSchema);
export default CustomRoles;