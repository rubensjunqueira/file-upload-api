import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { InvalidRoleError } from "../../errors/InvalidRoleError";
import { Role } from "../../models/User";
import { RegisterUserService } from "../../services/User/RegisterUserService";

@injectable()
export class RegisterUserController {
  constructor(
    @inject("RegisterUserService") private service: RegisterUserService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password, role } = req.body;

    if (!Object.values(Role).includes(role)) {
      throw new InvalidRoleError(`'${role}' role is invalid!`);
    }

    const createdUser = await this.service.execute({
      email,
      password,
      role,
    });

    return res.status(201).json(createdUser);
  }
}
