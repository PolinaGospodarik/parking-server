import { Router } from "express";
import {registerUser} from "../../controllers/admin/registerController";

const registerRouter = Router();

// Создать нового администратора
registerRouter.post("/create", registerUser);   // POST /admin/register/create

export default registerRouter;
