import { AppError } from "./AppError";

export class InvalidSignatureError extends AppError {
  constructor(message: string, code = 401) {
    super(message, code);
  }
}
