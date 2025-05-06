import {BookingStatus, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getOccupiedPlaces = async () => {

    const bookings = await prisma.booking.findMany({
        where: {
            status: {in: [BookingStatus.ACTIVE, BookingStatus.ALLOWED]},
        },
        include: {
            car: true
        }
    });

    return bookings;
};