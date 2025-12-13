import { Router } from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../config/authCheck";
import { Role } from "../user/user.interface";

const router = Router();
router.get("/", ProjectController.getAllProject);
router.get("/:id", ProjectController.getProjectById);
router.post(
  "/",
  checkAuth(...Object.values(Role)),
  ProjectController.createProject
);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  ProjectController.updateProject
);
router.delete(
  "/:id",
  checkAuth(...Object.values(Role)),
  ProjectController.deleteProjectById
);

export const projectRouter = router;
