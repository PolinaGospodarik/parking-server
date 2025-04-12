import { Router} from "express";
import type {Request, Response} from "express";
import adminRoutes from "./admin/index";
import authRouts from "./authRoutes.ts";
import userRotes from "./user";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("🚀 Сервер работает!");
});
// Все admin маршруты
router.use("/auth", authRouts);
router.use("/user", userRotes)
router.use("/admin", adminRoutes);

export default router;
