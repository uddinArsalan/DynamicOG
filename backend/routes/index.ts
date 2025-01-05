import { Router } from "express";
import ogImage from "./OgImage.route";
import postRoute from "./post.route";
import uploadRoute from "./upload.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import templatesRouter from "./templates.route";

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
