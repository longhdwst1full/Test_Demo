import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as socketio from "socket.io";
import mongoDBConnect from "./config/db.js";
import socket from "./config/socket.js";
import useragent from "express-useragent";
import http from "http";
import routes from "./routes/index.js";
import handleErr from "./middleware/handleErr.js";

const app = express();
const corsConfig = {
  origin: "*",
  credentials: true,
};
const PORT = 8000;

app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// connect db
mongoose.set("strictQuery", false);
mongoDBConnect();

const URI = "http://localhost:8000/api/";
// setup socket
// const io = new Server.Server(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "*",
//     },
// });
// create server
const server = http.createServer(app);
const io = new socketio.Server(server);
socket(io);
routes(app, io);

app.use(handleErr);

server.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

// io: Đây là đối tượng toàn cục của Socket.IO, thường được sử dụng để phát sóng (broadcast) tới tất cả các socket hoặc tới các phòng cụ thể.
// socket: Đây là đối tượng đại diện cho kết nối socket hiện tại, thường được sử dụng để giao tiếp trực tiếp với socket đó.
