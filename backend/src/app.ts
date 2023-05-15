import dotenv from "dotenv";
dotenv.config();
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./utils/validateEnv";
import ToDoRoutes from "./routes/ToDo";
import UserRoutes from "./routes/Users";
import cors from "cors";
import mongoose from "mongoose";

// const PORT = env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      // 1 hour //
    },
    rolling: true,
    store: MongoStore.create({ mongoUrl: env.MONGO }),
  })
);

mongoose.connect(env.MONGO);
app.get("/", (req: Request, res: Response) => {
  return res.send("works");
});
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

mongoose.connect(env.MONGO);

// if (PORT) {
//   app.listen(PORT, () => {
//     console.log(`server is running`);
//   });
// }

export default app;
