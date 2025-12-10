import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import { createUserToken } from "../../utils/userToken";

const loginWithCredential = async (payload: Partial<User>) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isUserExist) {
    throw new AppError(401, "User Not Found");
  }

  const comparePassword = await bcrypt.compare(
    payload.password as string,
    isUserExist.password as string
  );

  if (!comparePassword) {
    throw new AppError(401, "Password dose not match");
  }
  const userTokens = createUserToken(isUserExist);
  const { password, ...others } = isUserExist;

  return {
    user: others,
    accessToken: userTokens,
  };
};

export const AuthService = {
  loginWithCredential,
};
