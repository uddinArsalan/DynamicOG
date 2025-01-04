import { Router } from "express";
import {
  loginUser,
  registerUser,
  logout,
  refreshAccessToken,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout",verifyJWT, logout);

export default router;
