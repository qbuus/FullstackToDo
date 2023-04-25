import { RequestHandler } from "express";
import createHttpError from "http-errors";
import user from "../models/user";
import bcrypt from "bcryptjs";

type SigningUp = {
  username?: string;
  email?: string;
  password?: string;
};

export const getAuthenticated: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userAuthenticatin = await user
      .findById(req.session.userId)
      .select("+email")
      .exec();
    res.status(200).json(userAuthenticatin);
  } catch (error) {
    next(error);
  }
};

export const singUp: RequestHandler<
  unknown,
  unknown,
  SigningUp,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "please fill in");
    }

    const existingUser = await user
      .findOne({
        username: username,
      })
      .exec();

    if (existingUser) {
      throw createHttpError(
        401,
        "This username is already in use"
      );
    }

    const existingEmail = await user
      .findOne({ email: email })
      .exec();

    if (existingEmail) {
      throw createHttpError(
        401,
        "This email is already in use"
      );
    }

    const hashedPassoword = await bcrypt.hash(password, 10);

    const userCreate = await user.create({
      username: username,
      email: email,
      password: hashedPassoword,
    });

    req.session.userId = userCreate._id;

    res.json(userCreate);
  } catch (error) {
    next(error);
  }
};
