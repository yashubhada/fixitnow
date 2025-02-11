import mongoose from "mongoose";

export const ConnectMongo = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => {
            console.log('MongoDB connected successfully!');
        })
        .catch(err => {
            console.error('Connection error:', err);
        });
}
