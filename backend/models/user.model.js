import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    serviceProviderName: {
        type: String,
        required: true,
    },
    startingTime: {
        type: Date,
        required: true,
    },
    endingTime: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
});

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
    history: {
        type: [HistorySchema],
        default: [],
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
