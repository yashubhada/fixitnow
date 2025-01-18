import mongoose from "mongoose";

// Define the schema for the user
const providerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
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
    identityProof: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: 'serviceProvider'
    }
}, { timestamps: true });

const Provider = mongoose.model('ServiceProvider', providerSchema);
export default Provider;
