export interface ToDoInput {
  title: string;
  text?: string;
}

export interface ToDoBody {
  _id: string;
  title: string;
  text?: string;
  createdAt: string;
  updatedAt: string;
}
