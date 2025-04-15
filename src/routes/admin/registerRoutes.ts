import { Router } from "express";
import {registerUser} from "../../controllers/admin/registerController";
import { authenticate } from "../../middleware/authMiddleware";

const registerRouter = Router();

// Создать нового администратора
registerRouter.post("/create", authenticate,registerUser);   // POST /admin/register/create

export default registerRouter;
