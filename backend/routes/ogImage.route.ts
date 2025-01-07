import { Router } from "express";
import { generateOGImage } from "../controllers/ogimage.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/generate", verifyJWT, generateOGImage);

export default router;
