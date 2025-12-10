import httpStatusCode from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";

const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decoded = req.user;
    const blog = await BlogService.createBlog(req.body, decoded as JwtPayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Blog create successfully",
      data: blog,
    });
  }
);

const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decoded = req.user;
    const id = req.params.id;
    const blog = await BlogService.updateBlog(
      req.body,
      decoded as JwtPayload,
      Number(id)
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Blog update successfully",
      data: blog,
    });
  }
);

const getAllBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await BlogService.getAllBlog();
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "All Blog retrieve successfully",
      data: blogs,
    });
  }
);

const getMyBlogs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decoded = req.user;
    const blogs = await BlogService.getMyBlogs(decoded as JwtPayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Blogs retrieve successfully",
      data: blogs,
    });
  }
);

const getBlogById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const blog = await BlogService.getBlogById(Number(id));
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Blog retrieve successfully",
      data: blog,
    });
  }
);

const deleteBlogById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await BlogService.deleteBlogById(Number(id));
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Blog retrieve successfully",
      data: null,
    });
  }
);

export const BlogController = {
  createBlog,
  updateBlog,
  getAllBlog,
  getMyBlogs,
  getBlogById,
  deleteBlogById,
};
