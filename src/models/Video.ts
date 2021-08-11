/* eslint-disable func-names */
import mongoose, { Schema } from "mongoose";

export type VideoType = Document & {
  name: string;
  key: string;
  size: number;
  url: string;
  created_at: Date;
};

const VideoSchema = new Schema({
  name: String,
  key: String,
  size: Number,
  url: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

VideoSchema.pre<VideoType>("save", async function (next) {
  try {
    if (process.env.STORAGE === "local") {
      if (!this.url) {
        this.url = `${process.env.API_URL}/videos/${this.key}`;
      }
    } else if (process.env.STORAGE === "s3") {
      if (!this.url) {
        this.url = `${process.env.AWS_BUCKET_URL}/${this.key}`;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

// VideoSchema.pre<VideoType>(
//   "deleteOne",
//   { document: true, query: false },
//   async function (next) {
//     try {
//       if (process.env.STORAGE === "local") {
//         if (this.key) {
//           const pathFile = path.resolve(__dirname, "..", "..", "tmp", this.key);
//           await fs.unlink(pathFile);
//         }
//       }
//       next();
//     } catch (err) {
//       next(err);
//     }
//     // await fs.unlink(pathFile);
//   }
// );

export const Video = mongoose.model<VideoType>("videos", VideoSchema);
