import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookies } from "../../utils/setCookies";
import { createUserToken } from "../../utils/userToken";

const loginWithCredential = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const user = await AuthService.loginWithCredential(body);
    const userToken = createUserToken(user.user);

    setAuthCookies(res, { accessToken: userToken });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login Successful",
      data: user,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Logout Successful",
      data: null,
    });
  }
);
export const AuthController = {
  loginWithCredential,
  logout,
};
