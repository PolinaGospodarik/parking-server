import { Router } from "express";
import registerRoutes from "./registerRoutes";

const router = Router();

// Создать нового администратора
router.use("/register", registerRoutes);   // POST /admin/register/create

export default router;
