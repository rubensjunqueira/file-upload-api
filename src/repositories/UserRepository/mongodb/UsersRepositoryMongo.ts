import { ICreateUserDTO } from "../../../DTOs/ICreateUserDTO";
import { User, UserType } from "../../../models/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryMongo implements IUsersRepository {
  async create({ email, password, role }: ICreateUserDTO): Promise<UserType> {
    const createdUser = await User.create({
      email,
      password,
      role,
    });

    return createdUser;
  }

  async findById(id: string): Promise<UserType> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<UserType> {
    return User.findOne({ email });
  }
}
