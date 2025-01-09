import mongoose from "mongoose";

// Define the schema for the user
const userSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    userRole: {
        type: String,
        enum: ['Service Taker', 'Service Provider'],
        required: true
    },
    serviceType: String,
    serviceArea: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, { timestamps: true });

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
