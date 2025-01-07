import { Router } from "express";
import ogImage from "./ogImage.route.js";
import postRoute from "./post.route.js";
import uploadRoute from "./upload.route.js";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import templatesRouter from "./templates.route.js";

const router = Router();

const defaultRoutes = [
  {
    path: "/og",
    route: ogImage,
  },
  {
    path: "/post",
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
  {
    path: "/template",
    route: templatesRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
