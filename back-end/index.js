import express from "express";
import cors from "cors";
import http from "http";
import userRouter from "./router/userRouter.js";
import blogRouter from "./router/blogRouter.js";
import dotenv from "dotenv";
import initTables from "./config/createTables.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const server = http.createServer(app);

dotenv.config();

initTables();

app.use(cors());

app.use(express.json());

app.use(express.static("./public/uploads"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRouter);

app.use("/api/blogs", blogRouter);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.APP_PORT || 5000;

server.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
