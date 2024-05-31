import express from "express";
const router = express.Router();

router.post("", stickerManagerController.createStickerGroup);
router.put("/:id", stickerManagerController.updateStickerGroup);
router.delete("/:id", stickerManagerController.deleteStickerGroup);
router.post(
  "/:id",
  uploadFile.singleUploadMiddleware,
  stickerManagerController.addSticker
);
router.delete("/:id/sticker", stickerManagerController.deleteSticker);

export default router;
