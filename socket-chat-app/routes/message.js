import express from "express";

const messageRouter = (io) => {
  const messageController = new MessageController(io);
const router = express.Router();

  router.get("/:conversationId", messageController.getList);
  router.get("/channel/:channelId", messageController.getListByChannelId);
  router.post("/text", messageController.addText);
  router.get("/:conversationId/files", messageController.getListFiles);
  router.post(
    "/files",
    uploadFile.singleUploadMiddleware,
    messageController.addFile
  );
  router.post("/files/base64", messageController.addFileWithBase64);
  router.delete("/:id", messageController.deleteById);
  router.delete("/:id/only", messageController.deleteOnlyMeById);
  router.post("/:id/reacts/:type", messageController.addReaction);
  router.post("/:id/share/:conversationId", messageController.shareMessage);

  return router;
};

export default messageRouter;
