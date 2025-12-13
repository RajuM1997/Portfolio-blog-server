import httpStatusCode from "http-status-codes";
import { Post, Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";

const createBlog = async (
  payload: Prisma.PostCreateInput,
  decoded: JwtPayload
): Promise<Post> => {
  console.log(decoded);

  const post = await prisma.post.create({
    data: {
      ...payload,
      authorId: decoded.userId,
    },
  });
  return post;
};

const updateBlog = async (
  payload: Partial<Post>,
  decoded: JwtPayload,
  id: number
) => {
  if (!decoded.userId) {
    throw new AppError(httpStatusCode.UNAUTHORIZED, "User Not Found");
  }
  const blog = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (blog?.authorId !== decoded.userId && decoded.role !== "ADMIN") {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "You do not have permission to edit this blog post."
    );
  }

  const updatedBlog = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedBlog;
};

const getAllBlog = async () => {
  const blogs = await prisma.post.findMany();
  return blogs;
};

const getMyBlogs = async (decoded: JwtPayload) => {
  if (!decoded.userId) {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "You do not have permission to view this route."
    );
  }

  const blogs = await prisma.post.findMany({
    where: {
      authorId: Number(decoded.userId),
    },
  });

  return blogs;
};

const getBlogById = async (id: number) => {
  const blog = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          picture: true,
        },
      },
    },
  });
  return blog;
};

const deleteBlogById = async (id: number, decoded: JwtPayload) => {
  const blog = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  console.log(blog);

  if (blog?.authorId !== decoded.userId && decoded.role !== "ADMIN") {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "You do not have permission to delete this blog post."
    );
  }

  await prisma.post.delete({
    where: {
      id,
    },
  });
};

export const BlogService = {
  createBlog,
  getAllBlog,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlogById,
};
