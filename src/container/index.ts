import { container } from "tsyringe";

import { LoginUserController } from "../controllers/User/LoginUserController";
import { RegisterUserController } from "../controllers/User/RegisterUserController";
import { CreateVideoController } from "../controllers/Video/CreateVideoController";
import { DeleteVideoController } from "../controllers/Video/DeleteVideoController";
import { IStorageProvider } from "../providers/IStorageProvider";
import { LocalStorageProvider } from "../providers/Local/LocalStorageProvider";
import { S3StorageProvider } from "../providers/S3/S3StorageProvider";
import { IUsersRepository } from "../repositories/UserRepository/IUsersRepository";
import { UsersRepositoryMongo } from "../repositories/UserRepository/mongodb/UsersRepositoryMongo";
import { IVideosRepository } from "../repositories/VideoRepository/IVideosRepository";
import { VideosRepositoryMongo } from "../repositories/VideoRepository/mongodb/VideosRepositoryMongo";
import { LoginUserService } from "../services/User/LoginUserService";
import { RegisterUserService } from "../services/User/RegisterUserService";
import { CreateVideoService } from "../services/Video/CreateVideoService";
import { DeleteVideoService } from "../services/Video/DeleteVideoService";

const storageType = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storageType[process.env.STORAGE]
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepositoryMongo
);
container.registerSingleton<IVideosRepository>(
  "VideosRepository",
  VideosRepositoryMongo
);
container.registerSingleton("RegisterUserService", RegisterUserService);
container.registerSingleton("LoginUserService", LoginUserService);
container.registerSingleton("CreateVideoService", CreateVideoService);
container.registerSingleton("DeleteVideoService", DeleteVideoService);
container.registerSingleton(RegisterUserController);
container.registerSingleton(LoginUserController);
container.registerSingleton(CreateVideoController);
container.registerSingleton(DeleteVideoController);
