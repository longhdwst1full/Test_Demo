import express from "express";
const router = express.Router();

router.get("", stickerController.getAll);

export default router;
