import express from "express";
const router = express.Router();

const voteRouter = (io) => {
  const voteController = new VoteController(io);

  router.get("/:conversationId", voteController.getListVotesByConversationId);
  router.post("", voteController.addVoteMessage);
  router.post("/:messageId", voteController.addOptions);
  router.delete("/:messageId", voteController.deleteOptions);
  router.post("/:messageId/choices", voteController.addVoteChoices);
  router.delete("/:messageId/choices", voteController.deleteVoteChoices);

  return router;
};

export default voteRouter;
