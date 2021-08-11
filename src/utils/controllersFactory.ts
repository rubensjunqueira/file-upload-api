import { container } from "tsyringe";

import { LoginUserController } from "../controllers/User/LoginUserController";
import { RegisterUserController } from "../controllers/User/RegisterUserController";
import { CreateVideoController } from "../controllers/Video/CreateVideoController";
import { DeleteVideoController } from "../controllers/Video/DeleteVideoController";

export function controllersFactory() {
  const registerUserController = container.resolve(RegisterUserController);
  const loginUserController = container.resolve(LoginUserController);
  const createVideoController = container.resolve(CreateVideoController);
  const deleteVideoController = container.resolve(DeleteVideoController);

  return {
    registerUserController,
    loginUserController,
    createVideoController,
    deleteVideoController,
  };
}
