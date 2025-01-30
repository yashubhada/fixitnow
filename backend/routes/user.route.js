import {
    handleGetLoggedInUser,
    handleLogout,
    handleSignIn,
    handleUserSignUp,
    handleProviderSignUp,
    fetchAllProviders,
    createNewRequest,
    fetchSingleServiceRequest
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
// request
userRouter.post('/createNewRequest', handleAuthentication, createNewRequest);
userRouter.post('/fetchSingleServiceRequest', handleAuthentication, fetchSingleServiceRequest);

export default userRouter;
