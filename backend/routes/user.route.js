import { handleGetLoggedInUser, handleLogout, handleSignIn, handleUserSignUp, handleProviderSignUp } from "../controllers/user.controller.js";
import { Router } from 'express';
import { handleAuthentication } from "../middlewares/auth.middleware.js";
import multer from 'multer';
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
const uploadFields = upload.fields([
    { name: 'avatar', maxCount: 1 }, // Field for avatar image
    { name: 'identityProof', maxCount: 1 } // Field for identity proof document
]);

const userRouter = new Router();

userRouter.post('/userSignup', uploadFields, handleUserSignUp);
userRouter.post('/providerSignup', uploadFields, handleProviderSignUp);
userRouter.post('/signin', handleSignIn);
userRouter.post('/getLoggedInUser', handleAuthentication, handleGetLoggedInUser);
userRouter.post('/logout', handleAuthentication, handleLogout);

export default userRouter;
