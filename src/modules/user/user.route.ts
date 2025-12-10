import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../config/authCheck";
import { Role } from "./user.interface";

const router = Router();

router.get("/", UserController.getAllUser);
router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe);
router.post("/", UserController.createUser);
router.patch("/:id", UserController.updateUserById);

export const userRouter = router;
