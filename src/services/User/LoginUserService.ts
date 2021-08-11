import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "../../config/auth";
import { EmailOrPassowrdError } from "../../errors/EmailOrPasswordError";
import { UserType } from "../../models/User";
import { IUsersRepository } from "../../repositories/UserRepository/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: UserType;
  token: string;
}

@injectable()
export class LoginUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new EmailOrPassowrdError();

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) throw new EmailOrPassowrdError();

    const token = sign({ email: user.email, role: user.role }, auth.secret, {
      expiresIn: "1d",
      subject: String(user._id),
    });

    user.password = undefined;

    return {
      user,
      token,
    };
  }
}
