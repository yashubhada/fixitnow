import User from "../models/user.model.js";
import Provider from "../models/provider.modal.js";
import Request from "../models/request.modal.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handleUserSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const isProvider = await Provider.findOne({ email });
        if (isProvider) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Avatar image is required' });
        }

        // Hash password before saving the user
        const hashedPassword = await bcrypt.hash(password, 8);

        const avatarUpload = await cloudinary.uploader.upload(req.file.path, {
            folder: 'fixitnow',
            transformation: [
                {
                    width: 200,
                    height: 200,
                    crop: 'thumb',
                    gravity: 'face',
                },
            ]
        });

        // Delete the file after uploading to Cloudinary
        fs.unlinkSync(req.file.path);

        // Save user data to the database
        await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: avatarUpload.secure_url,
        });

        res.status(201).json({ success: true, message: "Signup successfull! 😊" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleProviderSignUp = async (req, res) => {
    try {
        const { name, email, service, price, address, password } = req.body;

        const isProvider = await Provider.findOne({ email });
        if (isProvider) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Validate the uploaded files
        if (!req.files || !req.files.avatar || !req.files.identityProof) {
            return res.status(400).json({
                success: false,
                message: 'Avatar and Identity Proof are required.',
            });
        }

        // Upload files to Cloudinary
        const avatarUpload = await cloudinary.uploader.upload(req.files.avatar[0].path, {
            folder: 'fixitnow',
            transformation: [
                {
                    width: 200,
                    height: 200,
                    crop: 'thumb',
                    gravity: 'face',
                },
            ]
        });
        const identityProofUpload = await cloudinary.uploader.upload(req.files.identityProof[0].path, {
            folder: 'fixitnow',
        });

        // Delete the uploaded files locally
        fs.unlinkSync(req.files.avatar[0].path);
        fs.unlinkSync(req.files.identityProof[0].path);

        // Save provider data
        await Provider.create({
            name,
            email,
            service,
            price,
            address,
            password: await bcrypt.hash(password, 8),
            avatar: avatarUpload.secure_url,
            identityProof: identityProofUpload.secure_url,
        });

        res.status(201).json({ success: true, message: 'Signup successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};


export const handleSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const provider = await Provider.findOne({ email });

        if (!user && !provider) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        let isValidPassword, tokenData;

        if (user) {
            isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }
            tokenData = {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.userRole
            };
        }

        if (provider) {
            isValidPassword = await bcrypt.compare(password, provider.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            // Update isAvailable to true in MongoDB
            await Provider.findOneAndUpdate(
                { email },
                { isAvailable: true },
                { new: true } // Returns the updated document
            );

            tokenData = {
                id: provider._id,
                name: provider.name,
                email: provider.email,
                service: provider.service,
                price: provider.price,
                address: provider.address,
                avatar: provider.avatar,
                identityProof: provider.identityProof,
                role: provider.userRole
            };
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
            .json({ success: true, role: tokenData.role, message: "Sign in successfull! 😊" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const fetchAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(201).json({ success: true, providers });
    } catch (err) {
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

export const handleLogout = async (req, res) => {
    try {
        if (req.user.role === 'serviceProvider') {
            const id = req.user.id;
            // Update isAvailable to true in MongoDB
            await Provider.findByIdAndUpdate(
                id,
                { isAvailable: false },
                { new: true } // Returns the updated document
            );
        }

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
        });
        res.status(201).json({ success: true, message: "Logout successfull! 👋" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}

export const createNewRequest = async (req, res) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).send({ success: false, message: "No token found, please log in" });
        }
        
        const { userId, providerId, location, serviceType, price, status, verificationCode } = req.body;
        await Request.create({
            userId,
            providerId,
            location,
            serviceType,
            price,
            status,
            verificationCode,
        });
        res.status(201).json({ success: true, message: "New Request Generated! 🎉🚀" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}