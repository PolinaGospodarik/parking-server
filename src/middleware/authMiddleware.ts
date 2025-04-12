import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export interface DecodedUser {
    userId: number;
    role: Role;
}

export interface AuthRequest extends Request {
    user?: DecodedUser;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET не задан в .env");
}

// Middleware для аутентификации
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Нет доступа" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Неверный токен" });
    }
};
