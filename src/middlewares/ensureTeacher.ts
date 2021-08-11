import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UserDoesNotExistsError } from "../errors/UserDoesNotExistsError";
import { UserIsNotTeacherError } from "../errors/UserIsNotTeacherError";
import { Role } from "../models/User";
import { UsersRepositoryMongo } from "../repositories/UserRepository/mongodb/UsersRepositoryMongo";

export async function ensureTeacher(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user;

  const usersRepository =
    container.resolve<UsersRepositoryMongo>("UsersRepository");

  const user = await usersRepository.findById(id);

  if (!user) {
    throw new UserDoesNotExistsError();
  }

  if (user.role !== Role.TEACHER) {
    throw new UserIsNotTeacherError();
  }

  next();
}
