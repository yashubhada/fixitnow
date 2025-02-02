import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalTime: {
        type: Number,
        default: null,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Completed', 'Canceled'],
        default: 'Pending',
    },
    verificationCode: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 8,
        match: /^[A-Z0-9]{8}$/,
    },
}, { timestamps: true });

const Request = mongoose.model('serviceRequest', requestSchema);
export default Request;