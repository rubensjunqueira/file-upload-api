import { AppError } from "./AppError";

export class TokenMissingError extends AppError {
  constructor(message = "Token is missing!", code = 401) {
    super(message, code);
  }
}
