import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import TodoSchema from "../models/TodoSchema";
import { assertIsDefined } from "../utils/isDefined";

type CreateToDoBody = {
  title: string;
  text: string;
};

type UpdateToDo = {
  id: string;
};

type UpdateToDos = {
  title: string;
  text: string;
};

export const getToDos: RequestHandler = async (
  req,
  res,
  next
) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    const ToDos = await TodoSchema.find({
      userId: authenticatedUserId,
    }).exec();
    res.status(200).json(ToDos);
  } catch (error) {
    next(error);
  }
};

export const getToDo: RequestHandler = async function (
  req,
  res,
  next
) {
  const todoId = req.params.todoId;
  const authenticatedUser = req.session.userId;
  try {
    assertIsDefined(authenticatedUser);

    if (!mongoose.isValidObjectId(todoId)) {
      throw createHttpError(400, "invalid ToDo id");
    }

    const ToDo = await TodoSchema.findById(todoId).exec();

    if (!ToDo) {
      createHttpError(404, "To Do Not Found");
    }

    if (!ToDo?.userId.equals(authenticatedUser)) {
      throw createHttpError(
        401,
        "You can not access this todo"
      );
    }

    res.status(200).json(ToDo);
  } catch (error) {
    next(error);
  }
};

export const createToDo: RequestHandler<
  unknown,
  unknown,
  CreateToDoBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authenticatedUser = req.session.userId;
  try {
    assertIsDefined(authenticatedUser);

    if (!title) {
      createHttpError(400, "Please fill in");
    }

    const newToDo = await TodoSchema.create({
      userId: authenticatedUser,
      title: title,
      text: text,
      expireAt: new Date(),
    });
    res.status(200).json(newToDo);
  } catch (error) {
    next(error);
  }
};

export const updateToDos: RequestHandler<
  UpdateToDo,
  unknown,
  UpdateToDos,
  unknown
> = async (req, res, next) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authenticatedUser = req.session.userId;
  try {
    assertIsDefined(authenticatedUser);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "invalid ToDo id");
    }

    if (!newTitle) {
      createHttpError(400, "Please fill in the title field");
    }

    const ToDo = await TodoSchema.findById({ _id: id }).exec();

    if (!ToDo) {
      throw createHttpError(404, "To Do not found");
    }

    if (!ToDo.userId.equals(authenticatedUser)) {
      throw createHttpError(401, "not authorized");
    }

    ToDo.title = newTitle;
    ToDo.text = newText;

    const updated = await ToDo.save();

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteToDo: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.params.id;
  const authenticatedUser = req.session.userId;
  try {
    assertIsDefined(authenticatedUser);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "invalid todo id ");
    }

    const toDo = await TodoSchema.findById(id).exec();

    if (!toDo) {
      throw createHttpError(404, "todo not found");
    }

    if (!toDo.userId.equals(authenticatedUser)) {
      throw createHttpError(401, "not authorized. No access");
    }

    await toDo.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
