import { Router } from "express";
import ogImage from "./OgImage.route.ts";
import postRoute from "./post.route.ts";
import uploadRoute from "./upload.route.ts";
import authRouter from "./auth.route.ts";
import userRouter from "./user.route.ts";
import templatesRouter from "./templates.route.ts";

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
