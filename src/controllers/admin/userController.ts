import type { Response } from "express";
import * as adminServce from "../../services/adminService.ts"
import type { AuthRequest } from "../../middleware/authMiddleware";


export const getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const users = await adminServce.getAll();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Неизвестная ошибка" });
        }
    }
};

export const get = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        let { id } = req.params;
        const userId = Number(id);

        if(!userId){
            res.status(400).json("Неверный id");
            return
        }

        const user = await adminServce.get(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Неизвестная ошибка" });
        }
    }
};

export const search = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const q = req.query.q?.toString().trim().toLowerCase() || "";

        if (typeof q !== 'string') {
            res.status(400).json({ message: 'Некорректный запрос' });
            return;
        }
        const terms = q.split(/\s+/);

        const results = await adminServce.searchUsers(terms);
        res.json(results);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Неизвестная ошибка" });
        }
    }
};
