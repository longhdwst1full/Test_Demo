import express from "express";
import { sendMessage, getMessages } from "../controllers/messageControllers.js";

const router = express.Router();

import { Auth } from "../middleware/user.js";
router.post("/", Auth, sendMessage);
router.get("/:chatId", Auth, getMessages);
export default router;
