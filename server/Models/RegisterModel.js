import {Schema, model} from "mongoose";

const registerSchema = new Schema(
    {
        name: {
            type:String,
            required : true,
        },
        email: {
            type:String,
            required : true,
        },
        password: {
            type:String,
            required : true,
        }
    },
    {timestamp:true, collection: 'User-Account', }
);
const UserAccount = model("User-Accounts", registerSchema);
export default UserAccount;