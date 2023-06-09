import dotenv from "dotenv";
dotenv.config();
import * as cors from "cors";

const whitelist = ["https://fulldo.onrender.com"];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (
      whitelist.indexOf(origin as string) !== -1 ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
