import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.ts";
import { uploadFileController } from "../controllers/upload.controller.ts";

const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "bgImage", maxCount: 1 },
    { name: "logoImage", maxCount: 1 },
  ]),
  uploadFileController
);

export default router;
