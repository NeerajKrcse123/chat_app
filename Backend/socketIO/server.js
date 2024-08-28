import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
// real time messaging using socket.io
export const getReceiverSocketId = (receiverId) => {
    const receiverSocketId = users[receiverId];
    return receiverSocketId;
};

const users = {}

// used to listen events on a server side
io.on("connection", (socket) => {
    console.log("New user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log("User added to users", users);
    }

    io.emit("getOnlineUsers", Object.keys(users));
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });
});



export { app, io, server };
