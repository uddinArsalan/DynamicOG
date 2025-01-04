import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { DeleteUserOGPostController, GetUserOGPostsController } from "../controllers/post.controller";

const router = Router();

//Get All User OG Posts
router.get("/", verifyJWT, GetUserOGPostsController);

// Get specific user og post
router.get("/:id", () => {});

// create post(not required)
router.post("/", () => {});

//delete
router.delete("/:id", verifyJWT,DeleteUserOGPostController);

export default router;
