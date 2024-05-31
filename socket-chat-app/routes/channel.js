import ChannelController from "../controllers/ChannelController.js";
import express from "express";

const channelRouter = (io) => {
  const router = express.Router();
  const channelController = new ChannelController(io);

  //   router.get("/:conversationId", channelController.getAllByConversationId);
  router.post("", channelController.add);
  router.put("", channelController.update);
  router.delete("/:channelId", channelController.deleteById);
  router.get(
    "/:channelId/last-view",
    channelController.getLastViewOfMembersInChannel
  );
  return router;
};

export default channelRouter;
