import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      select: true,
    },
    password: { type: String, required: true, select: false },
    expireAt: { type: Date, expires: 3600 },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
