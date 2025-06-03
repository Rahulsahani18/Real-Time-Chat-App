const userSocketMap = {}; // { userId: socketId }

let ioInstance; // this will hold our io reference

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized");
  }
  return ioInstance;
};

const socketHandler = (io) => {
  ioInstance = io; // store reference to io so we can access it elsewhere

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });
};

export default socketHandler;
