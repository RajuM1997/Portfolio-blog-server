import { Project, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createProject = async (
  payload: Prisma.ProjectCreateInput
): Promise<Project> => {
  const project = await prisma.project.create({
    data: payload,
  });
  return project;
};

const updateProject = async (
  payload: Prisma.ProjectUpdateInput,
  id: number
) => {
  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedProject;
};

const getAllProject = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

const getProjectById = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
};

const deleteProjectById = async (id: number) => {
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
};
