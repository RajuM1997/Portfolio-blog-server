import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRouter } from "../modules/auth/auth.route";
import { blogRouter } from "../modules/blog/blog.route";
import { projectRouter } from "../modules/project/project.route";

export const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/blog",
    route: blogRouter,
  },
  {
    path: "/project",
    route: projectRouter,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
