import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

interface DecodedUser {
    userId: number;
    role: Role;
}

interface AuthRequest extends Request {
    user?: DecodedUser;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET не задан в .env");
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Нет доступа" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Неверный токен" });
    }
};
