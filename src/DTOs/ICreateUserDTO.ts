import { Role } from "../models/User";

export interface ICreateUserDTO {
  email: string;
  password: string;
  role: Role;
}
