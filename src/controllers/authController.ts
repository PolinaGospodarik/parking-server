import type { Request, Response } from "express";
import authService from "../services/authService";


export const loginUser = async (req: Request, res: Response) => {
    try {
        const token = await authService.login(req.body.params);
        res.json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Неизвестная ошибка" });
        }
    }
};
