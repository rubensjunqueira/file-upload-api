import crypto from "crypto";
import multer, { Options } from "multer";
import path from "path";

const destination = path.resolve(__dirname, "..", "..", "tmp");

export const multerConfig: Options = {
  dest: destination,
  storage: multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(16).toString("hex");

      const fileName = `${fileHash}-${file.originalname.replace("-", "")}`;

      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["video/mp4"];

    const { mimetype } = file;

    if (allowedMimes.includes(mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Mimetype '${mimetype}' is invalid, try to use .mp4`));
    }
  },
};
