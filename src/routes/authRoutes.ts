import express from "express";
import { loginUser } from "../controllers/authController";

const authRouts = express.Router();

authRouts.post("/login", loginUser);


export default authRouts;