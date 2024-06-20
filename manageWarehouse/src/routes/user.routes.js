import express from "express";
import {
  createuser,
  deleteuser,
  findAlluser,
  updateuser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/user", createuser);
userRouter.get("/users", findAlluser);
userRouter.put("/user/:id", updateuser);
userRouter.delete("/user/:id", deleteuser);

export default userRouter;
