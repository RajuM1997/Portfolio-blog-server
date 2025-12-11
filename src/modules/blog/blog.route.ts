import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../config/authCheck";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/", BlogController.getAllBlog);
router.get("/my-blogs", BlogController.getMyBlogs);
router.get("/:id", BlogController.getBlogById);
router.post("/", checkAuth(...Object.values(Role)), BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);

export const blogRouter = router;
