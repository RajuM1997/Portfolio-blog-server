import { User } from "@prisma/client";
import { generateToken } from "./jwt";

export const createUserToken = (user: Partial<User>) => {
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES as string
  );
  return accessToken;
};
