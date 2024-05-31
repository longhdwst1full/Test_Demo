import express from "express";
const router = express.Router();

router.post("/:userId", memberController.addMember);
router.delete("/:userId", memberController.deleteMember);
router.delete("/leave", memberController.leaveGroup);

export default router;
