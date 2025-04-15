import express from "express";
import { loginUser,refreshToken } from "../controllers/authController";

const authRouts = express.Router();

authRouts.post("/login", loginUser);
authRouts.post("/refresh", refreshToken);


export default authRouts;