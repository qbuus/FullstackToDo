import dotenv from "dotenv";
dotenv.config();
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import ToDoRoutes from "./routes/ToDo";
import UserRoutes from "./routes/Users";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      // 1 hour //
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env
        .MONGODB_CONNECTION_STRING as string,
    }),
  })
);

app.use("/api", ToDoRoutes);
app.use("/api", UserRoutes);
mongoose.connect(process.env.MONGO as string);

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
