import {
    handleGetLoggedInUser,
    handleLogout,
    handleSignIn,
    handleUserSignUp,
    handleProviderSignUp,
    fetchAllProviders,
    createNewRequest,
    fetchSingleServiceRequest,
    fetchSingleTaker,
    fetchSingleProvider,
    serviceComplete,
    addReview,
    fetchProviderHistory,
    fetchUserHistory,
    handleUpdateTaker,
    handleUpdateProvider,
    forgotPassVerifyEmail,
    forgotPassVerifyCode,
    forgotPassResetPassword
} from "../controllers/user.controller.js";
import { Router } from 'express';
import { handleAuthentication } from "../middlewares/auth.middleware.js";
import multer from 'multer';
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
const uploadAvatarIdentity = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'identityProof', maxCount: 1 }
]);
const userRouter = new Router();

userRouter.post('/userSignup', upload.single('avatar'), handleUserSignUp);
userRouter.post('/providerSignup', uploadAvatarIdentity, handleProviderSignUp);
userRouter.post('/signin', handleSignIn);
userRouter.get('/fetchAllProviders', fetchAllProviders);
userRouter.post('/getLoggedInUser', handleAuthentication, handleGetLoggedInUser);
userRouter.post('/logout', handleAuthentication, handleLogout);

//update profile
userRouter.patch('/handleUpdateTaker/:id', handleAuthentication, upload.single('avatar'), handleUpdateTaker);
userRouter.patch('/handleUpdateProvider/:id', handleAuthentication, uploadAvatarIdentity, handleUpdateProvider);

// fetch single user and service provider
userRouter.get('/fetchSingleTaker/:id', fetchSingleTaker);
userRouter.get('/fetchSingleProvider/:id', fetchSingleProvider);

// request
userRouter.post('/createNewRequest', createNewRequest);
userRouter.post('/fetchSingleServiceRequest', fetchSingleServiceRequest);
userRouter.post('/serviceComplete', serviceComplete);
userRouter.post('/addReview/:providerId', addReview);

// history
userRouter.get('/fetchProviderHistory/:id', fetchProviderHistory);
userRouter.get('/fetchUserHistory/:id', fetchUserHistory);

//forgot password
userRouter.post('/forgotPassVerifyEmail', forgotPassVerifyEmail);
userRouter.post('/forgotPassVerifyCode', forgotPassVerifyCode);
userRouter.post('/forgotPassResetPassword', forgotPassResetPassword);

export default userRouter;
