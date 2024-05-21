import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as Server from "socket.io";
import mongoDBConnect from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/messgage.js";
import userRoutes from "./routes/user.js";
import axios from "axios";

const app = express();
const corsConfig = {
    origin: "*",
    credentials: true,
};
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use("/api", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// connect db
mongoose.set("strictQuery", false);
mongoDBConnect();
const server = app.listen(PORT, () => {
    console.log(`Server Listening at PORT - ${PORT}`);
});
const URI = "http://localhost:8000/api/";
// setup socket
const io = new Server.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData.id);
        socket.emit("connected");
    });

    socket.on("join room", (room) => {
        socket.join(room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));

    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieve) => {
        console.log(newMessageRecieve)
        var chat = newMessageRecieve.chatId;
        console.log("new message received")
        if (!chat.users) console.log("chats.users is not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieve.sender._id) return;
            socket.in(chat._id).emit("message recieved", newMessageRecieve);
        });
    });

    socket.on("create chat", async (data) => {
        console.log(data.token, data);
        try {
            await axios.post(
                `${URI}chat/`,
                { userId: data.userId },
                {
                    headers: {
                        authorization: `${data.token}`,
                    },
                }
            );
            console.log("Create chat with user " + data.userId);

            // Gửi thông báo cho tất cả người dùng trong phòng
            io.emit("user chat", `${data} joined the chat`);

        } catch (error) {
            console.log(error);
        }
    });
});
