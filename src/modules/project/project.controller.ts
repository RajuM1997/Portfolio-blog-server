import httpStatusCode from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectService } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const decoded = req.user;
    const project = await ProjectService.createProject(
      body,
      decoded as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Project created successfully",
      data: project,
    });
  }
);

const updateProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const id = req.params.id;
    const decoded = req.user;
    const project = await ProjectService.updateProject(
      body,
      Number(id),
      decoded as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Project updated successfully",
      data: project,
    });
  }
);

const getAllProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const projects = await ProjectService.getAllProject(page, limit);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "All Project retrieve successfully",
      data: projects,
    });
  }
);

const getMyProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decoded = req.user;
    const projects = await ProjectService.getMyProject(decoded as JwtPayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "All My Project retrieve successfully",
      data: projects,
    });
  }
);

const getProjectById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const projects = await ProjectService.getProjectById(Number(id));
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Project retrieve successfully",
      data: projects,
    });
  }
);

const deleteProjectById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const decoded = req.user;
    await ProjectService.deleteProjectById(Number(id), decoded as JwtPayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Project delete successfully",
      data: null,
    });
  }
);

export const ProjectController = {
  createProject,
  updateProject,
  getAllProject,
  getProjectById,
  deleteProjectById,
  getMyProject,
};
