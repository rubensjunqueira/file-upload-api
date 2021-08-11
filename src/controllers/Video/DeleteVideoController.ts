import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { DeleteVideoService } from "../../services/Video/DeleteVideoService";

@injectable()
export class DeleteVideoController {
  constructor(
    @inject("DeleteVideoService") private service: DeleteVideoService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { key } = req.params;

    await this.service.execute(key);

    return res.send();
  }
}
