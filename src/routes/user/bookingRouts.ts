import { Router } from "express";
import {
    createBooking,
    getBooking,
    getAllBookings,
    updateStatus,
    deleteBooking
} from "../../controllers/user/bookingController";
import { authenticate } from "../../middleware/authMiddleware";

const bookingRoutes = Router();

bookingRoutes.post("/create", authenticate, createBooking);
bookingRoutes.get("/:id", authenticate, getBooking);
bookingRoutes.get("/", authenticate, getAllBookings);
bookingRoutes.patch("/:id/status", authenticate, updateStatus);
bookingRoutes.delete("/:id", authenticate, deleteBooking);

export default bookingRoutes;
