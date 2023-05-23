import mongoose from "mongoose";
import env from "./utils/validateEnv";

export const mongoConnection = async () => {
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};
