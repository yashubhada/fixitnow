import mongoose from "mongoose";

export const ConnectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Connection error:', err);
    }
}