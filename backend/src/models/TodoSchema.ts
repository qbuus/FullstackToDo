import { InferSchemaType, model, Schema } from "mongoose";

const ToDoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: false },
    expireAt: { type: Date, expires: 3600, default: Date.now },
  },
  { timestamps: true }
);

type Todo = InferSchemaType<typeof ToDoSchema>;

export default model<Todo>("ToDo", ToDoSchema);
