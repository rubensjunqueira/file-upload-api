import { AppError } from "./AppError";

export class UserIsNotStudentError extends AppError {
  constructor(message = "Only students can access!", code = 403) {
    super(message, code);
  }
}
