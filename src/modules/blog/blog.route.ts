import { Router } from "express";
import { BlogController } from "./blog.controller";

const router = Router();

router.get("/", BlogController.getAllBlog);
router.get("/my-blogs", BlogController.getMyBlogs);
router.get("/:id", BlogController.getBlogById);
router.post("/", BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);

export const blogRouter = router;
