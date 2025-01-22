import express from "express";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { ConnectMongo } from "./Config.js";
import { Server } from 'socket.io';
import http from 'http';

ConnectMongo();

const app = express();
const server = http.createServer(app); // Use HTTP server with Express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Match your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin
  credentials: true,
}));

// Routes
app.use('/api/user', userRouter);

// Socket.IO logic
const userSockets = new Map(); // Map to store userId and socketId

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register user and map their userId to socketId
  socket.on('register', (userId) => {
    userSockets.set(userId, socket.id);
    console.log(`User registered: ${userId}`);
  });

  // Handle service request between two users
  socket.on('serviceRequest', ({ fromUserId, toUserId, requestData }) => {
    const targetSocketId = userSockets.get(toUserId);

    if (targetSocketId) {
      // Send request data to the specific user
      io.to(targetSocketId).emit('receiveRequest', {
        fromUserId,
        requestData,
      });
      console.log(`Service request sent from ${fromUserId} to ${toUserId}`);
    } else {
      console.log(`User ${toUserId} is not connected`);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, sId] of userSockets.entries()) {
      if (sId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

// Use server.listen instead of app.listen
const port = 9797;
server.listen(port, () => {
  console.log(`Fixitnow app listening on port ${port}`);
});
