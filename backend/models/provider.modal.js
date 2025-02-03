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
    avatar: {
        type: String,
        required: true
    },
    identityProof: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    userRole: {
        type: String,
        default: 'serviceProvider'
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        rating: {
            type: Number,
            default: null
        },
        message: {
            type: String,
            default: null
        }
    }]
}, { timestamps: true });

const Provider = mongoose.model('ServiceProvider', providerSchema);
export default Provider;
