import { Schema, model, InferSchemaType } from "mongoose";

const ToDoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: false },
  },
  { timestamps: true }
);

type ToDo = InferSchemaType<typeof ToDoSchema>;

export default model<ToDo>("User", ToDoSchema);
