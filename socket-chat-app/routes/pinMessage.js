import express from "express";

const pinMessageRouter = (io) => {
  const pinMessageController = new PinMessageController(io);
const router = express.Router();

  router.get("/:conversationId", pinMessageController.getAllPinMessages);
  router.post("/:messageId", pinMessageController.addPinMessage);
  router.delete("/:messageId", pinMessageController.deletePinMessage);

  return router;
};

export default pinMessageRouter;
