import express from "express";
import { googleAuth, logOut } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Google login route
authRouter.post("/google", googleAuth);

// Logout route
authRouter.get("/logout", logOut);

export default authRouter;