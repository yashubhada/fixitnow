import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const handleAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized user request' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_FIXITNOW_TOKEN);

        // Attach user data to the request object for use in subsequent middleware/handlers
        req.user = decoded;

        // Proceed to next middleware or route handler
        next();
    } catch (err) {
        console.error(err);
        // If JWT verification fails or some error occurs, return a 500 error
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};
