import type {Response} from "express";
import * as bookingService from "../../services/bookingService.ts";
import {BookingStatus} from "@prisma/client";
import type {AuthRequest} from "../../middleware/authMiddleware";

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {carId, from, to} = req.body;

        const isOwned = await bookingService.isCarOwnedByUser(req.user!.userId, Number(carId));
        if (!isOwned) {
            res.status(403).json({message: "Эта машина не принадлежит вам"});
            return;
        }

        const isBusy = await bookingService.isCarBookedAtTime(carId, from, to);
        if (isBusy) {
            res.status(409).json({ message: "На это время уже есть бронирование" });
            return;
        }

        const place = await bookingService.getAvailablePlace(Number(carId),new Date(from),new Date(to))

        if(place === 0){
            res.status(409).json({ message: "На указанное время нет свободных мест" });
        }

        const booking = await bookingService.createBooking(
            Number(carId),
            new Date(from),
            new Date(to),
            place
        );

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
};

export const getBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        const booking = await bookingService.getBookingById(Number(id));
        if (!booking) {
            res.status(404).json({message: "Не найдено"});
            return;
        }

        if (booking.car.userId !== req.user!.userId) {
            res.status(403).json({message: "Это бронирование не принадлежит вам"});
            return;
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
};

export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const bookings = await bookingService.getAllBookings();

        const userBookings = bookings.filter((booking) => booking.car.userId === req.user!.userId);

        res.status(200).json(userBookings);
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
};

export const updateStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        const booking = await bookingService.getBookingById(Number(id));
        if (!booking) {
            res.status(404).json({message: "Не найдено"});
            return
        }

        if (booking.car.userId !== req.user!.userId) {
            res.status(403).json({message: "Это бронирование не принадлежит вам"});
            return
        }

        const updatedBooking = await bookingService.updateBookingStatus(
            Number(id),
            status as BookingStatus
        );

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
};

export const deleteBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {id} = req.params;

        const booking = await bookingService.getBookingById(Number(id));
        if (!booking) {
            res.status(404).json({message: "Не найдено"});
            return;
        }

        if (booking.car.userId !== req.user!.userId) {
            res.status(403).json({message: "Это бронирование не принадлежит вам"});
            return
        }

        await bookingService.deleteBooking(Number(id));
        res.status(200).json({message: "Удалено"});
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
};

export const getCurrentBooking = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;

        if(!user){
            res.status(500);
            return ;
        }

        const booking = await bookingService.getCurrentBookingForUser(user.userId);

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getHistory = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            res.status(500);
            return;
        }

        const booking = await bookingService.getUserHistory(user.userId);

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
}

export const getFeatureBooking = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            res.status(500);
            return;
        }

        const booking = await bookingService.getFeature(user.userId);

        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({error: (error as Error).message});
    }
}
