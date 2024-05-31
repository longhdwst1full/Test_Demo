import * as redisDb from "./redis.js";

const handleLeave = async (userId) => {
  const cachedUser = await redisDb.get(userId);
  if (cachedUser)
    await redisDb.set(userId, {
      ...cachedUser,
      isOnline: false,
      lastLogin: new Date(),
    });
};

const handleJoin = async (userId) => {
  const cachedUser = await redisDb.get(userId);
  if (cachedUser)
    await redisDb.set(userId, {
      ...cachedUser,
      isOnline: true,
      lastLogin: null,
    });
};

const getUserOnline = async (userId, cb) => {
  const cachedUser = await redisDb.get(userId);

  if (cachedUser) {
    const { isOnline, lastLogin } = cachedUser;
    cb({ isOnline, lastLogin });
  }
};

const socket = (io) => {
  console.log(1, "socket");
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
      console.log(newMessageRecieve);
      var chat = newMessageRecieve.chatId;
      console.log("new message received");
      if (!chat.users) console.log("chats.users is not defined");

      chat.users.forEach((user) => {
        if (user._id == newMessageRecieve.sender._id) return;
        socket.in(chat._id).emit("message recieved", newMessageRecieve);
      });
    });

    socket.on("create room chat", async (data) => {
      try {
        const { data: result } = await axios.post(
          `${URI}chat/`,
          { userId: data.userId },
          {
            headers: {
              authorization: `${data.token}`,
            },
          }
        );

        console.log(result, "result");
        // Gửi thông báo cho tất cả người dùng trong phòng
        io.in(result._id).emit("get room chat", `${data} joined the chat`);
      } catch (error) {
        console.log(error);
      }
    });
  });
  // hande new v2
  io.on("connect", (socket) => {
    socket.on("disconnect", () => {
      const userId = socket.userId;

      if (userId) handleLeave(socket.userId);
    });

    socket.on("join", (userId) => {
      socket.userId = userId;
      socket.join(userId);
      handleJoin(userId);
    });

    socket.on("join-conversations", (conversationIds) => {
      conversationIds.forEach((id) => socket.join(id));
    });

    socket.on("join-conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("leave-conversation", (conversationId) => {
      socket.leave(conversationId);
    });

    socket.on("typing", (conversationId, me) => {
      socket.broadcast.to(conversationId).emit("typing", conversationId, me);
    });

    socket.on("not-typing", (conversationId, me) => {
      socket.broadcast
        .to(conversationId)
        .emit("not-typing", conversationId, me);
    });

    socket.on("get-user-online", (userId, cb) => {
      getUserOnline(userId, cb);
    });

    // call video
    socket.on(
      "subscribe-call-video",
      ({ conversationId, newUserId, peerId }) => {
        console.log(
          "subscribe-call-video: ",
          conversationId,
          newUserId,
          peerId
        );

        socket.join(conversationId + "call");
        socket.broadcast.to(conversationId + "call").emit("new-user-call", {
          conversationId,
          newUserId,
          peerId,
        });
      }
    );

    socket.on("conversation-last-view", (conversationId, channelId) => {
      const { userId } = socket;
      if (channelId) {
        lastViewService
          .updateLastViewOfChannel(conversationId, channelId, userId)
          .then(() => {
            socket.to(conversationId + "").emit("user-last-view", {
              conversationId,
              channelId,
              userId,
              lastView: new Date(),
            });
          })
          .catch((err) => console.log("Error socket conversation-last-view"));
      } else {
        lastViewService
          .updateLastViewOfConversation(conversationId, userId)
          .then(() => {
            socket.to(conversationId + "").emit("user-last-view", {
              conversationId,
              userId,
              lastView: new Date(),
            });
          })
          .catch((err) => console.log("Error socket conversation-last-view"));
      }
    });
  });
};

export default socket;
