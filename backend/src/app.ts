import dotenv from "dotenv";
dotenv.config();
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./utils/validateEnv";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(error);
    let errorMessage = "An error occured";
    let status = 500;

    if (isHttpError(error)) {
      status = error.status;
      errorMessage = error.message;
    }
    res.status(status).json({ error: errorMessage });
  }
);

export default app;
