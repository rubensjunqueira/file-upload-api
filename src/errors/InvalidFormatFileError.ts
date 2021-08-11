import { AppError } from "./AppError";

export class InvalidFormatFileError extends AppError {
  constructor(message: string, code = 422) {
    super(message, code);
  }
}
