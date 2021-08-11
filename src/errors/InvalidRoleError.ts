import { AppError } from "./AppError";

export class InvalidRoleError extends AppError {
  constructor(message = "Invalid role!", code = 400) {
    super(message, code);
  }
}
