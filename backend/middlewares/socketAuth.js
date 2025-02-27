import jwt from 'jsonwebtoken';

const socketAuth = async (socket, next) => {
    try {
        const token = socket.handshake.cookies?.accessToken;
        if (!token) {
            return next(new Error('Authentication error: Token required'));
        }

        const decoded = jwt.verify(token, process.env.SECRET_FIXITNOW_TOKEN);
        if(!decoded){
            return next(new Error('Authentication error: Invalid User'));
        }
        next();
    } catch (error) {
        next(new Error('Authentication error: Invalid token'));
    }
};

export default socketAuth;
