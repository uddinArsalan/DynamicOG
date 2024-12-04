import { Router } from "express";
import { generateOGImage } from "../controllers/ogimage.controller.js";

const router = Router();

router.post("/generate", generateOGImage);

export default router;
