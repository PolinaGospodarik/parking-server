import {Router} from "express";
import {authenticate} from "../../middleware/authMiddleware";
import {getMap} from "../../controllers/security/mapController.ts";

const mapRoutes = Router();

mapRoutes.get("/", authenticate, getMap);

export default mapRoutes;
