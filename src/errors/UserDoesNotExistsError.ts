import { AppError } from "./AppError";

export class UserDoesNotExistsError extends AppError {
  constructor(message = "User does not exists!", code = 404) {
    super(message, code);
  }
}
