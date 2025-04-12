import type { Response } from "express";
import * as carService from "../../services/carService";
import type { AuthRequest } from "../../middleware/authMiddleware";


export const getAllCars = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Пользователь не авторизован" });
            return;
        }

        const userId = req.user.userId;

        const cars = await carService.getAllCars(userId);
        res.status(200).json(cars);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Неизвестная ошибка" });
        }
    }
};

export const getCarById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!req.user) {
            res.status(401).json({ message: "Пользователь не авторизован" });
            return;
        }

        const userId = req.user.userId;

        const car = await carService.getCarById(Number(id), userId);

        if (!car) {
            res.status(404).json({ message: "Машина не найдена" });
            return;
        }

        res.status(200).json(car);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Неизвестная ошибка" });
        }
    }
};

export const createCar = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { number } = req.body.params;

        if (!req.user) {
            res.status(401).json({ message: "Пользователь не авторизован" });
            return;
        }

        const userId = req.user.userId;

        const car = await carService.createCar(userId, number);
        res.status(201).json(car);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unknown error" });
        }
    }
};

export const deleteCar = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!req.user) {
            res.status(401).json({ message: "Пользователь не авторизован" });
            return;
        }

        const user = req.user;
        await carService.deleteCar(Number(id), user);

        res.status(200).json({ message: "Машина удалена" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Неизвестная ошибка" });
        }
    }
};
