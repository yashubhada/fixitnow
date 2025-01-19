import mongoose from "mongoose";

// Define the schema for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarImage: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: 'serviceTaker'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
