import express from "express";
import AuthController from "../controllers/Auth.controller.js";

const router = express.Router();
router.post("/login", AuthController.login);
router.post("/register", AuthController.regiseterUser);
export { router as authRouter };
