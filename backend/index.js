
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './socket/socket.js'; // <-- import the handler

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    credentials: true
  }
});

socketHandler(io); // initialize socket connections

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
