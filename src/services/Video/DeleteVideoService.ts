import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../providers/IStorageProvider";
import { IVideosRepository } from "../../repositories/VideoRepository/IVideosRepository";

@injectable()
export class DeleteVideoService {
  constructor(
    @inject("VideosRepository") private videosRepository: IVideosRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  async execute(key: string): Promise<void> {
    await this.videosRepository.delete(key);
    await this.storageProvider.delete(key);
  }
}
