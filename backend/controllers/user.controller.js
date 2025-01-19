import User from "../models/user.model.js";
import Provider from "../models/provider.modal.js";
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

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Avatar image is required' });
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password before saving the user
        const hashedPassword = await bcrypt.hash(password, 8);

        await cloudinary.uploader.upload(req.file.path,
            {
                folder: 'fixitnow',
                transformation: [
                    {
                        width: 200,
                        height: 200,
                        crop: 'thumb',
                        gravity: 'face',
                    },
                ]
            },
            async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: err.message });
                }
                await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    avatarImage: result.secure_url,
                });
            }
        );

        res.status(201).json({ success: true, message: "Signup successfull!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleProviderSignUp = async (req, res) => {
    try {
        const { name, email, service, price, address, password } = req.body;

        // Validate the uploaded files
        if (!req.files || !req.files.avatar || !req.files.identityProof) {
            return res.status(400).json({
                success: false,
                message: 'Avatar and Identity Proof are required.',
            });
        }

        const isProvider = await Provider.findOne({ email });

        if (isProvider) {
            return res.status(400).json({ success: false, message: 'Service provider already exists' });
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