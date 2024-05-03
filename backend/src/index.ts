import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import accountRouter from "./routes/accountRoutes";
import postRouter from "./routes/postRoutes";
import {
  getAllPosts,
  handleRequestPost,
  handleNewComment,
} from "./socketHandlers";

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your frontend deployment
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(
  cookieSession({
    name: "session",
    keys: ["k1", "k2"],
    maxAge: 24 * 60 * 60 * 1000,
  }),
);

app.use(bodyParser.json());

// export const manager = new NlpManager();
// manager.load('model.nlp');  // Load the pre-trained model

const MONGO_URI = process.env.MONGODB_URI ?? "";
mongoose.connect(MONGO_URI).catch((error) => {
  console.error("MongoDB connection error:", error.message);
});

// define root route
app.get("/", (_, res) => {
  res.json({ message: "Hello, frontend!" });
});

app.get("/api/bye", (_, res) => {
  return res.json({ message: "Bye, frontend!" });
});

app.get("/api/hello", (_, res) => {
  return res.json({ message: "Hello, frontend!" });
});
// account routes
app.use("/api/account", accountRouter);

// question routes
app.use("/api/post", postRouter);

io.on("connection", (socket) => {
  console.log("A user connected");
  // In your socket connection handler in the server setup:

  socket.on("request-all-posts", () => getAllPosts(socket));
  socket.on("request-post", (postId) => handleRequestPost(socket, postId));
  socket.on("new-comment", (data) => handleNewComment(io, data.postId, data));

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// listen
server.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}.`);
});
