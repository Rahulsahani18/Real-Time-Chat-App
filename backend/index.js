import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './socket/socket.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

// __dirname setup (because ES modules don't support it by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// ==== Serve Frontend (Production) ====
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ==== Socket.io setup ====
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  }
});
socketHandler(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
