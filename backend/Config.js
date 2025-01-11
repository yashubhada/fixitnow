import mongoose from "mongoose";

export const ConnectMongo = () => {
    mongoose.connect('mongodb://localhost:27017/fixitnow')
        .then(() => {
            console.log('MongoDB connected successfully!');
        })
        .catch(err => {
            console.error('Connection error:', err);
        });
}
