import fs from "fs/promises";
import { resolve } from "path";

import { multerConfig } from "../../config/multerConfig";
import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string): Promise<void> {
    await fs.rename(
      resolve(multerConfig.dest, file),
      resolve(`${multerConfig.dest}/aulas`, file)
    );
  }

  async delete(file: string): Promise<void> {
    const filename = resolve(`${multerConfig.dest}/aulas`, file);

    console.log(filename);
    try {
      await fs.stat(filename);
    } catch {
      return;
    }

    await fs.unlink(filename);
  }
}
