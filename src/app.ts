import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import {convertDatesToMinsk} from "./middleware/timeMiddleware.ts";
import { activatePendingBookings } from './crons/activateBookings';

dotenv.config();

const app = express();

activatePendingBookings();

app.use(cors());
app.use(express.json());
app.use(convertDatesToMinsk)

// Основные маршруты
app.use("/", router);

export default app;
