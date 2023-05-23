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
import { mongoConnection } from "./MongoConnection";
import * as path from "path";
import env from "./utils/validateEnv";
import ToDoRoutes from "./routes/ToDo";
import UserRoutes from "./routes/Users";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { corsOptions } from "./corsOptions";

const PORT = env.PORT;

const app = express();

mongoConnection();

console.log(process.env.NODE_ENV);

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
      // 1 hour //
    },
    rolling: true,
    store: MongoStore.create({ mongoUrl: env.MONGODB_URL }),
  })
);

app.use("/api", ToDoRoutes);
app.use("/api", UserRoutes);

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

if (PORT) {
  app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
  });
}

export default app;
