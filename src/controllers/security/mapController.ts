import type {Response} from "express";
import * as mapService from "../../services/mapService.ts";
import type {AuthRequest} from "../../middleware/authMiddleware.ts";

export const getMap = async (req: AuthRequest, res: Response): Promise<void> => {

    try {
        const map = await mapService.getOccupiedPlaces();

        res.status(200).json(map);
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
};