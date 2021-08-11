import { AppError } from "./AppError";

export class UserAlreadyExistsError extends AppError {
  constructor(message: string, code = 400) {
    super(message, code);
  }
}
