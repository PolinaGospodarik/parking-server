import { Router } from "express";
import {
    createBooking,
    getBooking,
    getAllBookings,
    deleteBooking,
    getHistory,
    getCurrentBooking,
    getFeatureBooking
} from "../../controllers/user/bookingController";
import { authenticate } from "../../middleware/authMiddleware";

const bookingRoutes = Router();

bookingRoutes.get("/", authenticate, getAllBookings);
bookingRoutes.post("/create", authenticate, createBooking);
bookingRoutes.get("/history",authenticate,getHistory);
bookingRoutes.get("/current",authenticate,getCurrentBooking);
bookingRoutes.get("/feature",authenticate,getFeatureBooking);
bookingRoutes.get("/:id", authenticate, getBooking);
bookingRoutes.delete("/:id", authenticate, deleteBooking);

export default bookingRoutes;
