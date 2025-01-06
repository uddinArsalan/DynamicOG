import { Router } from "express";
import {
  getUserInfo,
  updateLinkController,
} from "../controllers/user.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router = Router();

router.get("/", verifyJWT, getUserInfo);
router.post("/addLink", verifyJWT, updateLinkController);

export default router;
