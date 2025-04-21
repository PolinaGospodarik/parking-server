import { Router } from "express";
import {registerUser} from "../../controllers/admin/registerController";
import { authenticate } from "../../middleware/authMiddleware";
import {get, getAll, search} from "../../controllers/admin/userController.ts";

const userRoutes = Router();

// Создать нового администратора
userRoutes.get("/", authenticate,getAll);
userRoutes.get("/search", authenticate,search);
userRoutes.get("/:id", authenticate,get);

export default userRoutes;
