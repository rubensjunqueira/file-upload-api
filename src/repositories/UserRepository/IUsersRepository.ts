import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { UserType } from "../../models/User";

export interface IUsersRepository {
  create({ email, password, role }: ICreateUserDTO): Promise<UserType>;
  findById(id: string): Promise<UserType>;
  findByEmail(email: string): Promise<UserType>;
}
