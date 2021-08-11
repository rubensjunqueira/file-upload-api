import { AppError } from "./AppError";

export class EmailOrPassowrdError extends AppError {
  constructor(messsage = "Email or password invalid!", code = 400) {
    super(messsage, code);
  }
}
