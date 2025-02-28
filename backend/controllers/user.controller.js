import User from "../models/user.model.js";
import Provider from "../models/provider.modal.js";
import Request from "../models/request.modal.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';
import fs from 'fs';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_MAIL_PASSWORD,
    },
});

const sendEmail = (userMail, verifyCode) => {
    transporter.sendMail({
        from: process.env.USER_MAIL,
        to: userMail,
        subject: "Fixitnow - verify email",
        text: `verification code is ${verifyCode}`,
    }, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

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
            avatarPublicId: avatarUpload.public_id
        });

        res.status(201).json({ success: true, message: "Signup successful" });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const fetchSingleTaker = async (req, res) => {
    try {
        const { id } = req.params;
        const taker = await User.findById(id);
        if (!taker) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        res.status(201).json({ success: true, taker });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleUpdateTaker = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, avatarPublicId } = req.body;

        const newData = {};
        if (name) newData.name = name;
        if (req.file?.path) {
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

            newData.avatar = avatarUpload.secure_url;
            newData.avatarPublicId = avatarUpload.public_id;

            await cloudinary.uploader.destroy(avatarPublicId);

            fs.unlinkSync(req.file.path);
        }

        const taker = await User.findByIdAndUpdate(
            id,
            newData,
            { new: true }
        )

        await Provider.updateMany(
            { "reviews.userId": id },
            {
                $set: {
                    "reviews.$[elem].userName": name,   // Update userName if name exists
                    "reviews.$[elem].userAvatar": newData.avatar // Update avatar if updated
                }
            },
            { arrayFilters: [{ "elem.userId": id }] } // Apply the update only to matching elements in the array
        );

        if (!taker) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        res.status(201).json({ success: true, taker, message: 'Profile updated successfully' });
    } catch (err) {
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
            avatarPublicId: avatarUpload.public_id,
            identityProof: identityProofUpload.secure_url,
            identityProofPublicId: identityProofUpload.public_id
        });

        res.status(201).json({ success: true, message: 'Signup successful' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const fetchSingleProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const provider = await Provider.findById(id);
        if (!provider) {
            return res.status(400).json({ success: false, message: 'Service provider not found' });
        }
        res.status(201).json({ success: true, provider });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleUpdateProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, service, price, address, avatarPublicId, identityProofPublicId } = req.body;

        const newData = {};

        if (name) newData.name = name;
        if (service) newData.service = service;
        if (price) newData.price = price;
        if (address) newData.address = address;

        if (req.files?.avatar) {
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
            newData.avatar = avatarUpload.secure_url;
            newData.avatarPublicId = avatarUpload.public_id;

            await cloudinary.uploader.destroy(avatarPublicId);

            fs.unlinkSync(req.files.avatar[0].path);
        }

        if (req.files?.identityProof) {
            const identityProofUpload = await cloudinary.uploader.upload(req.files.identityProof[0].path, {
                folder: 'fixitnow',
            });
            newData.identityProof = identityProofUpload.secure_url;
            newData.identityProofPublicId = identityProofUpload.public_id;

            await cloudinary.uploader.destroy(identityProofPublicId);
            fs.unlinkSync(req.files.identityProof[0].path);
        }

        const provider = await Provider.findByIdAndUpdate(
            id,
            newData,
            { new: true }
        )
        if (!provider) {
            return res.status(400).json({ success: false, message: 'Service provider not found' });
        }
        res.status(201).json({ success: true, provider, message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const provider = await Provider.findOne({ email });

        if (!user && !provider) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        let tokenData, generateToken;

        // If a user is found, validate password and send user data in response
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }
            tokenData = {
                _id: user._id,
                userRole: user.userRole
            };

            generateToken = jwt.sign(
                tokenData,
                process.env.SECRET_FIXITNOW_TOKEN,
                { expiresIn: '1h' }
            );

            return res
                .status(201)
                .cookie('accessToken', generateToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'fixitnow.onrender.com',
                    maxAge: 3600000
                })
                .json({ success: true, user: user, message: "Signin successful" });
        }

        if (provider) {
            const isValidPassword = await bcrypt.compare(password, provider.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            const updatedProvider = await Provider.findOneAndUpdate(
                { email },
                { isAvailable: true },
                { new: true } // Returns the updated document
            );

            tokenData = {
                _id: updatedProvider._id,
                userRole: updatedProvider.userRole
            };

            generateToken = jwt.sign(
                tokenData,
                process.env.SECRET_FIXITNOW_TOKEN,
                { expiresIn: '1h' }
            );

            return res
                .status(201)
                .cookie('accessToken', generateToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'fixitnow.onrender.com',
                    maxAge: 3600000
                })
                .json({ success: true, user: updatedProvider, message: "Signin successful" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


export const fetchAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(201).json({ success: true, providers });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleGetLoggedInUser = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        let user;

        if (!token) {
            return res.status(401).send({ success: false, message: "No token found, please log in" });
        }

        if (req.user.userRole === "serviceTaker") {
            user = await User.findById(req.user._id).select("-password");
        } else if (req.user.userRole === "serviceProvider") {
            user = await Provider.findById(req.user._id).select("-password");
        }

        if (!user) {
            return res.status(401).send({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            user
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const handleLogout = async (req, res) => {
    try {
        if (req.user.userRole === "serviceProvider") {
            const id = req.user._id;
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
            sameSite: 'None',
            domain: 'fixitnow.onrender.com',
            path: '/'
        });
        res.status(201).json({ success: true, message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const { id, avatarPublicId, identityProofPublicId, userRole } = req.body;
        console.log({ id, avatarPublicId, identityProofPublicId, userRole });
        if (userRole === "serviceProvider") {
            await cloudinary.uploader.destroy(avatarPublicId);
            await cloudinary.uploader.destroy(identityProofPublicId);
            await Provider.findByIdAndDelete(id);
        } else {
            await cloudinary.uploader.destroy(avatarPublicId);
            await User.findByIdAndDelete(id);
        }
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            domain: 'fixitnow.onrender.com',
            path: '/'
        });
        res.status(201).json({ success: true, message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const createNewRequest = async (req, res) => {
    try {
        const { userId, userName, userAvatar, providerId, providerName, providerAvatar, location, serviceType, price, status, verificationCode } = req.body;
        const newRequest = await Request.create({
            userId,
            userName,
            userAvatar,
            providerId,
            providerName,
            providerAvatar,
            location,
            serviceType,
            price,
            status,
            verificationCode,
        });

        if (status === 'Accepted') {
            await Provider.findByIdAndUpdate(
                providerId,
                { isAvailable: false },
                { new: true } // Returns the updated document
            );
        }

        if (!newRequest) {
            return res.status(201).json({ success: false, message: "Failed to create request" });
        }

        res.status(201).json({ success: true, requestId: newRequest._id, message: "New Request Generated! 🎉🚀" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const serviceComplete = async (req, res) => {
    try {
        const { requestId, providerId, totalTime } = req.body;
        await Request.findByIdAndUpdate(
            requestId,
            { totalTime },
            { new: true }
        );
        await Provider.findByIdAndUpdate(
            providerId,
            { isAvailable: true },
            { new: true }
        );
        res.status(201).json({ success: true, message: "Service completed successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const addReview = async (req, res) => {
    const { providerId } = req.params;
    const { userId, userName, userAvatar, rating, message } = req.body;

    try {
        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }
        provider.reviews.push({ userId, userName, userAvatar, rating, message });

        await provider.save();

        res.status(201).json({ success: true, message: "Review added successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const fetchSingleServiceRequest = async (req, res) => {
    try {
        const { id, verificationCode } = req.body;

        const request = await Request.findById(id);

        if (!request) {
            return res.status(404).json({ success: false, message: "Request Not Found" });
        }

        if (request.verificationCode !== verificationCode) {
            return res.status(400).json({ success: false, message: "Invalid Verification Code" });
        }

        res.status(200).json({ success: true, message: "Verification successful" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const fetchUserHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await Request.find({ userId: id });
        if (!history) {
            return res.status(404).json({ success: false, message: "History Not Found" });
        }
        res.status(200).json({ success: true, history });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const fetchProviderHistory = async (req, res) => {
    try {
        const { id } = req.params;

        const history = await Request.find({ providerId: id });

        if (!history) {
            return res.status(404).json({ success: false, message: "History Not Found" });
        }

        res.status(200).json({ success: true, history });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// forgot password
// email verification and code generate

export const forgotPassVerifyEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const taker = await User.findOne({ email });
        const provider = await Provider.findOne({ email });

        if (!taker && !provider) {
            return res.status(404).json({ success: false, message: "Invalid email" });
        }

        const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000);
        const verifyCode = generateVerificationCode();

        await Promise.all([
            taker && User.updateOne({ _id: taker._id }, { verificationCode: verifyCode }),
            provider && Provider.updateOne({ _id: provider._id }, { verificationCode: verifyCode })
        ]);

        let userData = taker
            ? { _id: taker._id, userRole: taker.userRole }
            : { _id: provider._id, userRole: provider.userRole };

        sendEmail(email, verifyCode);

        res.status(200).json({ success: true, userData, message: "Verification code has been sent to your email" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const forgotPassVerifyCode = async (req, res) => {
    try {
        const { id, role, verifyCode } = req.body;
        if (role === "serviceTaker") {
            const taker = await User.findById(id);
            if (!taker) {
                return res.status(404).json({ success: false, message: "user not found" });
            }
            if (String(taker.verificationCode) === String(verifyCode)) {
                await User.updateOne({ _id: id }, { verificationCode: null });
                return res.status(201).json({ success: true, message: "Verification successful" });
            }
        }
        if (role === "serviceProvider") {
            const provider = await Provider.findById(id);
            if (!provider) {
                return res.status(404).json({ success: false, message: "user not found" });
            }
            if (String(provider.verificationCode) === String(verifyCode)) {
                await Provider.updateOne({ _id: id }, { verificationCode: null });
                return res.status(201).json({ success: true, message: "Verification successful" });
            }
        }

        res.status(400).json({ success: false, message: "Incorrect verification code" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const forgotPassResetPassword = async (req, res) => {
    try {
        const { id, role, password } = req.body;
        if (role === "serviceTaker") {
            const taker = await User.findById(id);
            if (!taker) {
                return res.status(404).json({ success: false, message: "user not found" });
            }
            const hashedPassword = await bcrypt.hash(password, 8);
            await User.updateOne({ _id: id }, { password: hashedPassword });
        }
        if (role === "serviceProvider") {
            const provider = await Provider.findById(id);
            if (!provider) {
                return res.status(404).json({ success: false, message: "user not found" });
            }
            const hashedPassword = await bcrypt.hash(password, 8);
            await Provider.updateOne({ _id: id }, { password: hashedPassword });
        }

        res.status(201).json({ success: true, message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}