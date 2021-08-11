import { ICreateVideoDTO } from "../../DTOs/ICreateVideoDTO";
import { VideoType } from "../../models/Video";

export interface IVideosRepository {
  create({ key, name, size, url }: ICreateVideoDTO): Promise<VideoType>;
  list(): Promise<VideoType[]>;
  findById(id: string): Promise<VideoType>;
  findByName(name: string): Promise<VideoType>;
  findByKey(key: string): Promise<VideoType>;
  delete(key: string): Promise<void>;
}
