import { PrismaClient } from "@prisma/client";
import type {DecodedUser} from "../middleware/authMiddleware.ts";

const prisma = new PrismaClient();
export const getAllCars = async (userId: number) => {
    return prisma.car.findMany({
        where: { userId },
    });
};

export const getCarById = async (carId: number, userId: number) => {
    return prisma.car.findFirst({
        where: { id: carId, userId },
    });
};
export const createCar = (userId: number, carNumber: string) => {
    return prisma.car.create({
        data: {
            carNumber,
            user: {
                connect: { id: userId }
            }
        }
    });
};

export const deleteCar = async (carId: number, user: DecodedUser) => {
    const car = await prisma.car.findUnique({ where: { id: carId } });

    if (!car) {
        throw new Error("Машина не найдена");
    }

    if (car.userId !== user.userId && user.role !== "ADMIN") {
        throw new Error("У вас нет прав на удаление этой машины");
    }

    await prisma.car.delete({ where: { id: carId } });
};

