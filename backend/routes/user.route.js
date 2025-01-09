import { handleGetLoggedInUser, handleLogout, handleSignIn, handleSignUp } from "../controllers/user.controller.js";
import { Router } from 'express';
import { handleAuthentication } from "../middlewares/auth.middleware.js";

const userRouter = new Router();

userRouter.post('/signup', handleSignUp);
userRouter.post('/signin', handleSignIn);
userRouter.post('/logout', handleAuthentication, handleLogout);
userRouter.post('/get-token', handleAuthentication, handleGetLoggedInUser);

export default userRouter;
