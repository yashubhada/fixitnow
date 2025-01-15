import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handleSignUp = async (req, res) => {
    try {
        const { name, email, password, userRole, serviceType, serviceArea } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please choose your avatar image' });
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        if (userRole === 'serviceProvider') {
            if (!serviceType) {
                return res.status(400).json({ success: false, message: 'Service Type is required for Service Providers' });
            }
            if (!serviceArea) {
                return res.status(400).json({ success: false, message: 'Service Area is required for Service Providers' });
            }
        }

        // Hash password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        cloudinary.uploader.upload(req.file.path,
            { folder: 'fixitnow' },
            async (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }
                await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    avtarImage: result.secure_url,
                    userRole,
                    serviceType,
                    serviceArea
                });
            }
        );

        res.status(201).json({ success: true, message: "Signup successfull!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
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
            { expiresIn: '1h' }
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