import { hash } from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";

export enum Role {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type UserType = Document & {
  email: string;
  password: string;
  role: Role;
};

const UserSchema = new Schema({
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    enum: Role,
    default: Role.STUDENT,
  },
});

// eslint-disable-next-line prefer-arrow-callback
UserSchema.pre<UserType>("save", async function (next) {
  try {
    const hashedPassword = await hash(this.password, 8);
    this.password = hashedPassword;

    next();
  } catch (err) {
    next(err);
  }
});

export const User = mongoose.model<UserType>("users", UserSchema);
