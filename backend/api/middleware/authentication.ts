import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiredAuthentication: RequestHandler = (
  req,
  res,
  next
) => {
  if (req.session.userId) {
    next();
  } else {
    next(createHttpError(4001, "User is not authenticated"));
  }
};
