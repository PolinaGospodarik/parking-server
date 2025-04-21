import type {Request, Response} from "express";
import authService from "../services/authService";
import type {AuthRequest} from "../middleware/authMiddleware.ts";


export const loginUser = async (req: Request, res: Response) => {
    try {
        const {accessToken, refreshToken, user} = await authService.login(req.body);
        res.json({
            accessToken, refreshToken, user
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({message: error.message});
        } else {
            res.status(500).json({message: "Неизвестная ошибка"});
        }
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.body.refreshToken;
        const accessToken = await authService.refresh(refreshToken);
        if (accessToken) {
            res.json({
                accessToken
            });
        } else {
            res.status(401).json({message: "Неверный токен"});
        }

    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({message: error.message});
        } else {
            res.status(500).json({message: "Неизвестная ошибка"});
        }
    }
};


export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({message: "Пользователь не авторизован"});
        return;
    }

    const user = await authService.getUser(req.user.userId);
    res.json(user);
};