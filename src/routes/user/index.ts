import { Router } from "express";
import carsRoutes from "./carsRoutes.ts";
import bookingRoutes from "./bookingRouts.ts";

const userRotes = Router();

userRotes.use("/cars", carsRoutes);
userRotes.use("/booking", bookingRoutes);

export default userRotes;
