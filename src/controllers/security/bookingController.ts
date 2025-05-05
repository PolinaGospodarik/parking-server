import type {Response} from "express";
import * as bookingService from "../../services/bookingService.ts";
import type {AuthRequest} from "../../middleware/authMiddleware.ts";

export const allowCarEntry = async (req: AuthRequest, res: Response): Promise<void> => {
    const { carNumber } = req.body as { carNumber?: string };

    if (!carNumber) {
        res.status(400).json({ message: "Номер машины обязателен" });
        return;
    }

    try {
        const booking = await bookingService.allowEntryForCar(carNumber);

        if (!booking) {
            res.status(404).json({ message: "Нет разрешённого бронирования для этой машины" });
            return;
        }

        res.status(200).json({ message: "Въезд разрешён", booking });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const completeBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { carNumber } = req.body as { carNumber?: string };

        if (!carNumber) {
            res.status(400).json({ message: "Номер машины обязателен" });
            return;
        }

        const result = await bookingService.completeBooking(carNumber);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};