import { inject, injectable } from "tsyringe";

import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import { Role, UserType } from "../../models/User";
import { IUsersRepository } from "../../repositories/UserRepository/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
  role: Role;
}

@injectable()
export class RegisterUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password, role }: IRequest): Promise<UserType> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists)
      throw new UserAlreadyExistsError(`User '${email}' already exists!`);

    const createdUser = await this.usersRepository.create({
      email,
      password,
      role,
    });

    createdUser.password = undefined;

    return createdUser;
  }
}
