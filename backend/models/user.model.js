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
    avtarImage: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        enum: ['serviceTaker', 'serviceProvider'],
        required: true
    },
    serviceType: {
        type: String,
        default: null,
    },
    serviceArea: {
        type: String,
        default: null,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
