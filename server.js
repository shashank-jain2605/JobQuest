import "express-async-errors";
import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import morgan from "morgan";
// router
import authRouter from "./routes/authRouter.js";
import jobsRouter from "./routes/jobsRouter.js";

dotenv.config();

const app = express();

// middleware
// json data available in the controllers express middleware

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ masg: "home page" });
  console.log("home page");
});

app.get("/api/v1", (req, res) => {
  res.json({ masg: "home page" });
});

// routers here:
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

// app.use for middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;

// connect to db
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
