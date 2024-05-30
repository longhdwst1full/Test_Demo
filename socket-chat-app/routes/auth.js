import express from "express"
import AuthController from "../controllers/Auth.controller.js";
import { Auth } from "../middleware/user.js";
import { register, validUser } from "../controllers/userController.js";


const router = express.Router();
router.post("/auth/login", AuthController.login)
router.get('/auth/valid', Auth, validUser);
router.post('/auth/register', register);
export { router as authRouter }