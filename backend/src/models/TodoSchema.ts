import { Schema, model, InferSchemaType } from "mongoose";

const ToDoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: false },
    expireAt: { type: Date, expires: 3600 },
  },
  { timestamps: true }
);

type ToDo = InferSchemaType<typeof ToDoSchema>;

export default model<ToDo>("ToDo", ToDoSchema);
