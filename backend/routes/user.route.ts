import { Router } from "express";
import { getUserInfo } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyJWT, getUserInfo);

export default router;
