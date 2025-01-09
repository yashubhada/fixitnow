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
    userRole: {
        type: String,
        enum: ['Service Taker', 'Service Provider'],
        required: true
    },
    serviceType: {
        type: String,
        default: null,
    },
    serviceArea: {
        areaName: {
            type: String,
            default: null,
        },
        coordinates: {
            type: [Number],
            default: null,
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
