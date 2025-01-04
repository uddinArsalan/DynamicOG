import { Router } from "express";
import { generateOGImage } from "../controllers/ogimage.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/generate", verifyJWT, generateOGImage);

export default router;
