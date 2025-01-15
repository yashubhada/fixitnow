import { handleGetLoggedInUser, handleLogout, handleSignIn, handleSignUp } from "../controllers/user.controller.js";
import { Router } from 'express';
import { handleAuthentication } from "../middlewares/auth.middleware.js";
import multer from 'multer';
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const userRouter = new Router();

userRouter.post('/signup', upload.single('userUploadImage'), handleSignUp);
userRouter.post('/signin', handleSignIn);
userRouter.post('/getLoggedInUser', handleAuthentication, handleGetLoggedInUser);
userRouter.post('/logout', handleAuthentication, handleLogout);

export default userRouter;
