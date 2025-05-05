import cron from 'node-cron';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const activatePendingBookings = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();

            const bookings = await prisma.booking.findMany({
                where: {
                    status: 'PENDING',
                    startTime: {
                        lte: now,
                    },
                },
            });

            for (const booking of bookings) {
                await prisma.booking.update({
                    where: { id: booking.id },
                    data: {
                        status: 'ALLOWED',
                    },
                });
            }

            if (bookings.length > 0) {
                console.log(`Активировано ${bookings.length} бронирований`);
            }
        } catch (err) {
            console.error('Ошибка в cron-задаче активации бронирований:', err);
        }
    });
};
