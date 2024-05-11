import { Router } from "express";
import AuthController from "../controllers/AuthController";

const userRouter = Router();

userRouter.post("/register", AuthController.register);
userRouter.post("/login", AuthController.login);
userRouter.get("/user", AuthController.getall);

export default userRouter;