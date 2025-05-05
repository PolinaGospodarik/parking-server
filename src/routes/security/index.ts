import { Router } from "express";
import bookingRoutes from "./bookingRoutes.ts";

const securityRoutes = Router();

securityRoutes.use("/booking", bookingRoutes);

export default securityRoutes;
