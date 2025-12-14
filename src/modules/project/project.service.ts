import httpStatusCode from "http-status-codes";
import { Project, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";

const createProject = async (
  payload: Prisma.ProjectCreateInput,
  decoded: JwtPayload
): Promise<Project> => {
  if (!decoded.userId) {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "You are not able add project"
    );
  }

  const project = await prisma.project.create({
    data: { ...payload, authorId: decoded.userId },
  });
  return project;
};

const updateProject = async (
  payload: Prisma.ProjectUpdateInput,
  id: number,
  decoded: JwtPayload
) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  if (project?.authorId !== decoded.userId && decoded.role !== "ADMIN") {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "You do not have permission to edit this project."
    );
  }
  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedProject;
};

const getAllProject = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const projects = await prisma.project.findMany({
    skip: skip,
    take: limit,
  });
  return projects;
};

const getMyProject = async (decoded: JwtPayload) => {
  if (!decoded.userId) {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "You do not have permission to view this route."
    );
  }

  const projects = await prisma.project.findMany({
    where: {
      authorId: Number(decoded.userId),
    },
  });

  return projects;
};

const getProjectById = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
};

const deleteProjectById = async (id: number, decoded: JwtPayload) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  if (project?.authorId !== decoded.userId && decoded.role !== "ADMIN") {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "You do not have permission to delete this project."
    );
  }
  await prisma.project.delete({
    where: { id },
  });
  return null;
};

export const ProjectService = {
  createProject,
  updateProject,
  getAllProject,
  getProjectById,
  deleteProjectById,
  getMyProject,
};
