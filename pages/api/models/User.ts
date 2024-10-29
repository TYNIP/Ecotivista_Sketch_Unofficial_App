import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface IUser{
    _id?: ObjectId | String | undefined;
    username: string;
    email: string;
    password: string;
    createAt?: string; 
    updatedAt?: string;
    userLogStatus: Boolean;
}

export interface IUserSchema extends Document{
    _id?: ObjectId | String | undefined;
    username: string;
    email: string;
    password: string;
    createAt?: string; 
    updatedAt?: string;
    userLogStatus: Boolean;
}

const UserSchema: Schema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    userLogStatus:{
        type: Boolean,
        default: false,
        required: true,
    },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;