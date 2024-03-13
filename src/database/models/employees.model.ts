import mongoose ,{Schema} from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeId: "string",
    name: "string",
    email: "string",
    departmantId: {type: Schema.Types.ObjectId, ref: 'departments', required: true},
    });

const Employee = mongoose.model("employee", employeeSchema);
export default Employee;