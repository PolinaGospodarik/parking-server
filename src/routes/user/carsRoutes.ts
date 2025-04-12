import { Router } from "express";
import {createCar, deleteCar, getAllCars, getCarById} from "../../controllers/user/carsController";
import { authenticate } from "../../middleware/authMiddleware";

const carRoutes = Router();

carRoutes.get("",authenticate,getAllCars);
carRoutes.get("/:id",authenticate,getCarById);
carRoutes.post("/create", authenticate, createCar);
carRoutes.delete("/delete/:id", authenticate, deleteCar);

export default carRoutes;
