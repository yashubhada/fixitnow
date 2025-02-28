import express from "express";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';
import { ConnectMongo } from "./Config.js";
import { Server } from 'socket.io';
import http from 'http';
import mainSocket from "./socket.js";

dotenv.config();
ConnectMongo();

const app = express();
const server = http.createServer(app); // Use HTTP server with Express
const io = new Server(server, {
  cors: {
    origin: "https://fixitnow-service.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://fixitnow-service.netlify.app",
  credentials: true,
}));

// Routes
app.use('/api/user', userRouter);

// Socket.IO
mainSocket(io);

// Use server.listen instead of app.listen
const port = process.env.FIXITNOW_BACKEND_PORT;
server.listen(port, () => {
  console.log(`Fixitnow app listening on port ${port}`);
});
