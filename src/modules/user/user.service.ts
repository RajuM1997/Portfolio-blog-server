import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (isUserExist) {
    throw new AppError(400, "User Already exist");
  }
  const hashPassword = await bcrypt.hash(
    payload.password as string,
    Number(process.env.BCRYPT_SALT_ROUND)
  );

  payload.password = hashPassword;
  const newUser = await prisma.user.create({
    data: payload,
  });
  return newUser;
};
const getAllUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const updateUserById = async (payload: Partial<User>, id: number) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new AppError(401, "User Not Found");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedUser;
};

const getMe = async (decoded: JwtPayload) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(decoded.userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      status: true,
      posts: true,
    },
  });
  return user;
};

export const UserService = {
  createUser,
  getAllUser,
  updateUserById,
  getMe,
};
