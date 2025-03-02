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
    avatar: {
        type: String,
        required: true
    },
    avatarPublicId: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: 'serviceTaker'
    },
    verificationCode: {
        type: Number,
        default: null
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
