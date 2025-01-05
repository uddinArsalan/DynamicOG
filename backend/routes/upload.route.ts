import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { uploadFileController } from "../controllers/upload.controller";

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
