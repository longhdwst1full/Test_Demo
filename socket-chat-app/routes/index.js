import { Auth } from "../middleware/user.js";
import { authRouter } from "./auth.js";
import channelRouter from "./channel.js";
import conversationRouter from "./conversation.js";
import friendRouter from "./friend.js";
import messageRouter from "./message.js";
import userMangeRouter from "./usermanage.js";
import classifyRouter from "./classify.js";

const routes = (app, io) => {
  app.use("/api/users", Auth, userMangeRouter);
  app.use("/api/auth", authRouter);
  //   app.use("/me", Auth, meRouter);
  app.use("/friends", Auth, friendRouter);
  app.use("/classifies", Auth, classifyRouter);
  app.use("/messages", Auth, messageRouter);
  app.use("/conversations", Auth, conversationRouter);
  //   app.use("/pin-messages", Auth, pinMessageRouter);
  //   app.use("/votes", Auth, voteRouter);
  //   app.use("/stickers", Auth, stickerRoute);
  app.use("/channels", Auth, channelRouter);
  //   app.use("/admin/stickers-manager", Auth, adminAuth, stickerManagerRouter);
  //   app.use("/admin/users-manager", Auth, adminAuth, userMangeRouter);
  //   app.use("/common", commonInfoRoutr);
};

export default routes;
