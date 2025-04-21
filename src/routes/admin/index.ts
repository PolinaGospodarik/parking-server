import { Router } from "express";
import registerRoutes from "./registerRoutes";
import userRotes from "../admin/userRoutes.ts";

const router = Router();

// Создать нового администратора
router.use("/register", registerRoutes);
router.use("/user",userRotes );

export default router;
