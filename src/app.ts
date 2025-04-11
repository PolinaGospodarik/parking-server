import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Основные маршруты
app.use("/", router);

export default app;
