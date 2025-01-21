import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
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
    serviceType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Accepted', 'Completed', 'Canceled'],
        default: 'Pending',
    },
    startedAt: {
        type: Date,
        default: null,
    },
    completedAt: {
        type: Date,
        default: null,
    },
    userLocation: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
module.exports = ServiceRequest;
