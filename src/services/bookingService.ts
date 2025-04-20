import {BookingStatus, PrismaClient} from "@prisma/client";
import dotenv from "dotenv"

dotenv.config();

const prisma = new PrismaClient();
const TOTAL_PLACES = Number(process.env.TOTAL_PLACES || 10);

export const createBooking = async (
    carId: number,
    from: Date,
    to: Date,
    place: number
) => {

    return prisma.booking.create({
        data: {
            carId,
            startTime: from,
            endTime: to,
            placeNumber: place,
            status: BookingStatus.PENDING
        },
    });
};

export const getBookingById = async (id: number) => {
    return prisma.booking.findUnique({
        where: {id},
        include: {
            car: {
                include: {
                    user: true,
                }
            }
        }
    })
};

export const getAllBookings = async () => {
    return prisma.booking.findMany({
        include: {
            car: {
                include: {
                    user: true,
                }
            }
        }
    });
};

export const updateBookingStatus = async (
    id: number,
    status: BookingStatus
) => {
    return prisma.booking.update({
        where: {id},
        data: {status}
    });
};

export const deleteBooking = async (id: number) => {
    return prisma.booking.delete({
        where: {id}
    });
};


export const isCarOwnedByUser = async (userId: number, carId: number): Promise<boolean> => {
    const car = await prisma.car.findUnique({
        where: {id: carId},
        select: {userId: true},
    });
    return car ? car.userId === userId : false;
};

export const getAvailablePlace = async (carId: number, from: Date, to: Date): Promise<number> => {
    const overlapping = await prisma.booking.findMany({
        where: {
            carId,
            AND: [
                {startTime: {lt: to}},
                {endTime: {gt: from}},
            ],
        },
        select: {placeNumber: true},
    });

    const occupiedPlaces = new Set(overlapping.map(b => Number(b.placeNumber)));

    for (let i = 1; i <= TOTAL_PLACES; i++) {
        if (!occupiedPlaces.has(i)) {
            return i;
        }
    }
    return 0;
}

export const isCarBookedAtTime = async (carId: number, from: Date, to: Date): Promise<boolean> => {
    const existingBooking = await prisma.booking.findFirst({
        where: {
            carId,
            OR: [
                {
                    startTime: {
                        lt: to,
                    },
                    endTime: {
                        gt: from,
                    },
                },
            ],
            status: {
                not: BookingStatus.CANCELLED
            },
        },
    });

    return !!existingBooking;
};

export const getCurrentBookingForUser = async (userId: number) => {
    const now = new Date();

    const booking = await prisma.booking.findFirst({
        where: {
            startTime: { lte: now },
            endTime: { gte: now },
            car: {
                userId: userId
            }
        },
        include: {
            car: true
        }
    });

    return booking;
};

export const getUserHistory = async (userId: number) => {

    const booking = await prisma.booking.findMany({
        where: {
            status: BookingStatus.COMPLETED,
            car: {
                userId: userId
            }
        },
        include: {
            car: true
        }
    });

    return booking;
};