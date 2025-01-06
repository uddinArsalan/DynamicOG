import { Router } from "express";
import { getAllTemplates } from "../controllers/templates.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", verifyJWT, getAllTemplates);
// router.post("/login", loginUser);
// router.post("/refresh-token", refreshAccessToken);
// router.post("/logout",verifyJWT, logout);

export default router;
