import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { CreateVideoService } from "../../services/Video/CreateVideoService";

@injectable()
export class CreateVideoController {
  constructor(
    @inject("CreateVideoService") private service: CreateVideoService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { filename: key, originalname: name, size } = req.file;

    const createdVideo = await this.service.execute({
      name,
      key,
      size,
      url: "",
    });

    return res.status(201).json(createdVideo);
  }
}
