import express, { json, urlencoded } from "express";
import config from "./config/config.js";
import routes from "./routes/index.js";
import connectDB from "./db/index.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorMiddleware.js";
// import { feedTemplatesModel } from "./scripts/index.js";

const app = express();

app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      // feedTemplatesModel()
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error ", error);
  });
