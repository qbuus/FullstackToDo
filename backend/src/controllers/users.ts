import { RequestHandler } from "express";
import createHttpError from "http-errors";
import user from "../models/user";
import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/passwordValidator";

type SigningUp = {
  username?: string;
  email?: string;
  password?: string;
};

type SigningIn = {
  username?: string;
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

export const signUp: RequestHandler<
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

    const checkedPassword = validatePassword(password);

    if (checkedPassword) {
      throw createHttpError(
        401,
        "This password is not strong enough"
      );
    }

    const hashedPassoword = await bcrypt.hash(password, 10);

    const userCreate = await user.create({
      username: username,
      email: email,
      password: hashedPassoword,
      expireAt: new Date(),
    });

    req.session.userId = userCreate._id;

    res.status(200).json(userCreate);
  } catch (error) {
    next(error);
  }
};

export const SignIn: RequestHandler<
  unknown,
  unknown,
  SigningIn,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password) {
      throw createHttpError(401, "invalid parameters");
    }

    const existingUser = await user
      .findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!existingUser) {
      throw createHttpError(401, "invalid credentials");
    }

    const matchingPassword = bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchingPassword) {
      throw createHttpError(401, "invalid password");
    }

    req.session.userId = existingUser._id;
    res.status(201).json(existingUser);
  } catch (error) {
    next(error);
  }
};

export const SingOut: RequestHandler = (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        next(error);
      }
      res.sendStatus(200);
    });
  } catch (error) {
    next(error);
  }
};
