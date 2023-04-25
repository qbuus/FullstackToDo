import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT || 8020;

mongoose
  .connect(env.MONGO)
  .then(() => {
    console.log("database is connected");
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`);
    });
  })
  .catch(console.error);
