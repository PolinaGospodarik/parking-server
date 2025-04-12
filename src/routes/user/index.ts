import { Router } from "express";
import carsRoutes from "./carsRoutes.ts";

const userRotes = Router();

// Создать нового администратора
userRotes.use("/cars", carsRoutes);

export default userRotes;
