import prisma from "../config/database.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role} from "@prisma/client";
import crypto from "crypto";

interface RegisterInput {
    fullName: string;
    phoneNumber: string;
    role: Role;
}

interface LoginInput {
    phoneNumber: string;
    password: string;
}

class AuthService {
    async register({ fullName, phoneNumber, role }: RegisterInput): Promise<object> {
        if (!Object.values(Role).includes(role)) {
            throw new Error("Недопустимая роль");
        }

        const existingUser = await prisma.user.findUnique({ where: { phoneNumber } });
        if (existingUser) {
            throw new Error("Пользователь с таким номером уже существует");
        }

        const generatedPassword = crypto.randomBytes(4).toString("hex"); // 8-символьный пароль
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        const user = await prisma.user.create({
            data: {
                fullName,
                phoneNumber,
                password: hashedPassword,
                role
            }
        });

        if (!user) {
            throw new Error("Не удалось создать пользователя");
        }

        const { password: _, ...safeUser } = user;

        return {
            ...safeUser,
            password: generatedPassword
        };
    }

    // Вход пользователя
    async login({ phoneNumber, password }: LoginInput): Promise<string> {
        const user = await prisma.user.findUnique({ where: { phoneNumber } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Неверный номер телефона или пароль");
        }

        return jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
    }
}

export default new AuthService();
