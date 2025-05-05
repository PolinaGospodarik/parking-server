import { Router } from "express";
import { authenticate } from "../../middleware/authMiddleware";
import {allowCarEntry, completeBooking} from "../../controllers/security/bookingController.ts";

const bookingRoutes = Router();

bookingRoutes.post("/start",authenticate,allowCarEntry);
bookingRoutes.post("/end",authenticate,completeBooking);

export default bookingRoutes;
