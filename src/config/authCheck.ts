import { JwtPayload } from "jsonwebtoken";
import httpStatusCode from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { prisma } from "./db";
import { Role, UserStatus } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;

      if (!accessToken) {
        throw new AppError(httpStatusCode.FORBIDDEN, "No Token Received");
      }
      const verifiedToken = verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      const isUserExist = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });

      if (!isUserExist) {
        throw new AppError(httpStatusCode.BAD_REQUEST, "User does not Found");
      }

      if (
        isUserExist.status === UserStatus.BLOCK &&
        isUserExist.role !== Role.ADMIN
      ) {
        throw new AppError(
          httpStatusCode.BAD_REQUEST,
          `User is ${isUserExist.status}`
        );
      }

      if (!verifiedToken) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          "You are not authorized"
        );
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          "You are not permitted to view this route!!"
        );
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
