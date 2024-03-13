import mongoose, {Schema} from "mongoose";

const teamSchema = new mongoose.Schema({
    teamId: "string",
    assignmentStatus: { type: Boolean, required: true},
    workHours: { type: String, required: true},
    teamComments: { type: String, required: true},
    customTeamRolesId: { type: Schema.Types.ObjectId, ref: 'customteamroles' ,required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'projects' ,required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' ,required: true },
});

const Team = mongoose.model("team", teamSchema);
export default Team;