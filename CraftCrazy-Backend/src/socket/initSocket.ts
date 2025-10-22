import { Server } from "socket.io";
import http from "http";

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
    origin: process.env.FRONTEND_URL, // same frontend URL
    methods: ["GET", "POST"],
    credentials: true, 
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Example event: Product updates or notifications
    socket.on("sendMessage", (data) => {
      console.log("Message:", data);
      io.emit("receiveMessage", data); // broadcast message to all
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};
