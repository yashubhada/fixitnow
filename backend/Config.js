import mongoose from "mongoose";

export const ConnectMongo = () => {
    mongoose.connect('mongodb://0.0.0.0:27017/fixitnow')
        .then(() => {
            console.log('MongoDB connected successfully!');
        })
        .catch(err => {
            console.error('Connection error:', err);
        });
}
