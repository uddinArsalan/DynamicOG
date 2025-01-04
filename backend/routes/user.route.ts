import { Router } from "express";
import {
  getUserInfo,
  updateLinkController,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyJWT, getUserInfo);
router.post("/addLink", verifyJWT, updateLinkController);

export default router;
