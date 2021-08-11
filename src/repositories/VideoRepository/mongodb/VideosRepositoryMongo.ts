import { ICreateVideoDTO } from "../../../DTOs/ICreateVideoDTO";
import { Video, VideoType } from "../../../models/Video";
import { IVideosRepository } from "../IVideosRepository";

export class VideosRepositoryMongo implements IVideosRepository {
  async create({ key, name, size, url }: ICreateVideoDTO): Promise<VideoType> {
    const newVideo = await Video.create({
      name,
      key,
      size,
      url,
    });

    return newVideo;
  }

  async delete(key: string): Promise<void> {
    const video = await Video.findOne({ key });
    video?.deleteOne();
  }

  list(): Promise<VideoType[]> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<VideoType> {
    throw new Error("Method not implemented.");
  }

  findByName(name: string): Promise<VideoType> {
    throw new Error("Method not implemented.");
  }

  findByKey(key: string): Promise<VideoType> {
    throw new Error("Method not implemented.");
  }
}
