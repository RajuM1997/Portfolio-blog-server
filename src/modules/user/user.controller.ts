import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const user = await UserService.createUser(body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User Created successfully",
      data: user,
    });
  }
);

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUser();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All users retrieve successfully",
      data: users,
    });
  }
);

const updateUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const id = req.params.id;
    const user = await UserService.updateUserById(body, Number(id));
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User Updated successfully",
      data: user,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decoded = req.user;
    const user = await UserService.getMe(decoded as JwtPayload);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User profile retrieve successfully",
      data: user,
    });
  }
);

export const UserController = {
  createUser,
  updateUserById,
  getAllUser,
  getMe,
};
