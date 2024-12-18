import { Router } from "express";
import ogImage from "./ogImage.route.js";
import postRoute from "./post.route.js";
import uploadRoute from "./upload.route.js";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";

const router = Router();

const defaultRoutes = [
  {
    path: "/og",
    route: ogImage,
  },
  {
    path: "/createPost",
    route: postRoute,
  },
  {
    path: "/upload",
    route: uploadRoute,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
