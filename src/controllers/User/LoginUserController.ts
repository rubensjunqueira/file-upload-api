import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { LoginUserService } from "../../services/User/LoginUserService";

@injectable()
export class LoginUserController {
  constructor(@inject("LoginUserService") private service: LoginUserService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticatedUser = await this.service.execute({ email, password });

    return res.status(200).json(authenticatedUser);
  }
}
