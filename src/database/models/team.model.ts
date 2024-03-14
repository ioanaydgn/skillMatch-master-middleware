import mongoose, {Schema} from "mongoose";

const teamSchema = new mongoose.Schema({
    teamId: "string",
    assignmentStatus: { type: Boolean, required: true},
    workHours: { type: String, required: true},
    teamComments: { type: String, required: true},
    customTeamRolesId: { type: Schema.Types.String, ref: 'customteamroles' ,required: true },
    projectId: { type: Schema.Types.String, ref: 'projects' ,required: true },
    userId: { type: Schema.Types.String, ref: 'users' ,required: true },
});

const Team = mongoose.model("team", teamSchema);
export default Team;