import { Router } from "express";
import { generateOGImage } from "../controllers/ogimage.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/generate", verifyJWT, generateOGImage);

export default router;
