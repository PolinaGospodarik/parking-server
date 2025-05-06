import {Router} from "express";
import bookingRoutes from "./bookingRoutes.ts";
import mapRoutes from "./mapRoutes.ts";

const securityRoutes = Router();

securityRoutes.use("/booking", bookingRoutes);
securityRoutes.use("/map", mapRoutes);

export default securityRoutes;
