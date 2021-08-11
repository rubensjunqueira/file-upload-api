import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UserDoesNotExistsError } from "../errors/UserDoesNotExistsError";
import { UserIsNotStudentError } from "../errors/UserIsNotStudentError";
import { Role } from "../models/User";
import { UsersRepositoryMongo } from "../repositories/UserRepository/mongodb/UsersRepositoryMongo";

export async function ensureStudent(
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

  if (user.role !== Role.STUDENT) {
    throw new UserIsNotStudentError();
  }

  next();
}
