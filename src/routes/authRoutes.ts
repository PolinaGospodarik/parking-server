import express from "express";
import {getUser, loginUser, refreshToken} from "../controllers/authController";
import {authenticate} from "../middleware/authMiddleware.ts";

const authRouts = express.Router();

authRouts.post("/login", loginUser);
authRouts.post("/refresh", refreshToken);
authRouts.get("/user", authenticate,getUser);


export default authRouts;