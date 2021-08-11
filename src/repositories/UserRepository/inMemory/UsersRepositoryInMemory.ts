import { ICreateUserDTO } from "../../../DTOs/ICreateUserDTO";
import { User, UserType } from "../../../models/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private repository: UserType[];

  constructor(data?: UserType[]) {
    if (data) this.repository = data;
    else this.repository = [];
  }

  async create({ email, password, role }: ICreateUserDTO): Promise<UserType> {
    const newUser = new User({ email, password, role });

    this.repository.push(newUser);

    return newUser;
  }

  async findById(id: string): Promise<UserType> {
    return this.repository.find((x) => x._id === id);
  }

  async findByEmail(email: string): Promise<UserType> {
    return this.repository.find((x) => x.email === email);
  }
}
