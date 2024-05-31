import express from "express";

const friendRouter = (io) => {
  const router = express.Router();

  const friendController = new FriendController(io);

  router.get("", friendController.getListFriends);
  router.post("/:userId", friendController.acceptFriend);
  router.delete("/:userId", friendController.deleteFriend);
  router.get("/invites", friendController.getListFriendInvites);
  router.delete("/invites/:userId", friendController.deleteFriendInvite);
  router.get("/invites/me", friendController.getListFriendInvitesWasSend);
  router.post("/invites/me/:userId", friendController.sendFriendInvite);
  router.delete("/invites/me/:userId", friendController.deleteInviteWasSend);
  router.get("/suggest", friendController.getSuggestFriends);

  return router;
};

export default friendRouter;
