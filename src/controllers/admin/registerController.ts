import type {Request, Response} from "express";
import authService from "../../services/authService.ts";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body.params);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Неизвестная ошибка" });
        }
    }
};
