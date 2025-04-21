import {BookingStatus, PrismaClient} from "@prisma/client";
import dotenv from "dotenv"

const prisma = new PrismaClient();

export const getAll = async () => {
    const users = await prisma.user.findMany({
        include: {
            cars: {
                include: {
                    Booking: true
                }
            }
        }
    });

    return  users.map(user => {
        const allBookings = user.cars.flatMap(car => car.Booking);
        return {
            ...user,
            allBookings
        };
    });
};

export const get = async (userId:number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            cars: {
                include: {
                    Booking: true
                }
            }
        }
    });

    if(!user){
        return null;
    }

    const allBookings = user.cars.flatMap(car => car.Booking);
    return {
        ...user,
        allBookings
    };
};

export const searchUsers = async (terms: string[]) => {
    const users = await prisma.user.findMany({
        where: {
            AND: terms.map((term) => ({
                OR: [
                    {
                        fullName: {
                            contains: term,
                            mode: "insensitive",
                        },
                    },
                    {
                        phoneNumber: {
                            contains: term,
                            mode: "insensitive",
                        },
                    },
                    {
                        cars: {
                            some: {
                                carNumber: {
                                    contains: term,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                ],
            })),
        },
        include: {
            cars: {
                include: {
                    Booking: true,
                },
            },
        },
    });

    return  users.map(user => {
        const allBookings = user.cars.flatMap(car => car.Booking);
        return {
            ...user,
            allBookings
        };
    });
};
