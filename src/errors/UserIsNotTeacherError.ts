import { AppError } from "./AppError";

export class UserIsNotTeacherError extends AppError {
  constructor(message = "Only teachers can access!", code = 403) {
    super(message, code);
  }
}
