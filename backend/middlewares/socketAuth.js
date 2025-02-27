import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const socketAuth = async (socket, next) => {
    try {
        const token = socket.handshake.cookies?.accessToken;
        if (!token) {
            return next(new Error('Authentication error: Token required'));
        }

        const decoded = jwt.verify(token, process.env.SECRET_FIXITNOW_TOKEN);
        const user = await User.findById(decoded._id).select('-password');

        if (!user) {
            return next(new Error('Authentication error: User not found'));
        }

        socket.user = user;  // Attach user data to the socket
        next();
    } catch (error) {
        next(new Error('Authentication error: Invalid token'));
    }
};

export default socketAuth;
