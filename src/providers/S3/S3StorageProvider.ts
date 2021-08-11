import { S3 } from "aws-sdk";
import fs from "fs/promises";
import mime from "mime";
import { resolve } from "path";

import { multerConfig } from "../../config/multerConfig";
import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async save(file: string): Promise<void> {
    const originalName = resolve(multerConfig.dest, file);

    const fileContent = await fs.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.unlink(originalName);
  }

  async delete(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file,
      })
      .promise();
  }
}
