import { handleGetLoggedInUser, handleLogout, handleSignIn, handleSignUp } from "../controllers/user.controller.js";
import { Router } from 'express';
import { handleAuthentication } from "../middlewares/auth.middleware.js";

const userRouter = new Router();

userRouter.post('/signup', handleSignUp);
userRouter.post('/signin', handleSignIn);
userRouter.post('/getLoggedInUser', handleAuthentication, handleGetLoggedInUser);
userRouter.post('/logout', handleAuthentication, handleLogout);

export default userRouter;
