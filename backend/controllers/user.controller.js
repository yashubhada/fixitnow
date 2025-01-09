import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

export const handleSignUp = async (req, res) => {
    try {
        const { name, email, password, userRole, serviceType, serviceArea } = req.body;

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        if (userRole === 'Service Provider') {
            if (!serviceType) {
                return res.status(400).json({ success: false, message: 'Service Type is required for Service Providers' });
            }
            if (!serviceArea || !serviceArea.areaName || !serviceArea.coordinates) {
                return res.status(400).json({ success: false, message: 'Service Area (Area name and Coordinates) is required for Service Providers' });
            }
        }

        // Hash password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            userRole,
            serviceType,
            serviceArea
        });

        res.status(201).json({ success: true, newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}

export const handleSignIn = async (req, res) => {
    try {
        let tokenData = null;
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        // compare hash password
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        tokenData = {
            uid: user._id,
        }

        if (!tokenData) return res.status(401).json({ success: false, message: 'Token data not found' });

        const generateToken = jwt.sign(
            tokenData,
            process.env.SECRET_FIXITNOW_TOKEN,
            { expiresIn: '1m' }
        );

        res
            .status(201)
            .cookie('accessToken', generateToken, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000
            })
            .json({ success: true, message: "Sign in successfull!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleGetLoggedInUser = (req, res) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).send({ success: false, message: "No token found, please log in" });
        }
        return res.status(200).json({
            success: true,
            token,
            user: req.user || null
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleLogout = (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
        });
        res.status(201).json({ success: true, message: "Logout successfull!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}