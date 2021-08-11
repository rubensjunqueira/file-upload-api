import { inject, injectable } from "tsyringe";

import { VideoType } from "../../models/Video";
import { IStorageProvider } from "../../providers/IStorageProvider";
import { IVideosRepository } from "../../repositories/VideoRepository/IVideosRepository";

interface IRequest {
  name: string;
  key: string;
  size: number;
  url: string;
}

@injectable()
export class CreateVideoService {
  constructor(
    @inject("VideosRepository") private videosRepository: IVideosRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  async execute({ name, key, url, size }: IRequest): Promise<VideoType> {
    const createdVideo = await this.videosRepository.create({
      name,
      key,
      url,
      size,
    });

    await this.storageProvider.save(key);

    return createdVideo;
  }
}
