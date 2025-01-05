import { Router } from "express";
import {
  getUserInfo,
  updateLinkController,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyJWT, getUserInfo);
router.post("/addLink", verifyJWT, updateLinkController);

export default router;
