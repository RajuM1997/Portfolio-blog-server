import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../config/authCheck";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/", BlogController.getAllBlog);
router.get(
  "/my-blogs",
  checkAuth(...Object.values(Role)),
  BlogController.getMyBlogs
);
router.get(
  "/:id",
  checkAuth(...Object.values(Role)),
  BlogController.getBlogById
);
router.post("/", checkAuth(...Object.values(Role)), BlogController.createBlog);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  BlogController.updateBlog
);
router.delete(
  "/:id",
  checkAuth(...Object.values(Role)),
  BlogController.deleteBlogById
);

export const blogRouter = router;
