import {
  create,
  deletRole,
  findAll,
  updateRole,
} from "../controllers/role.controller.js";
import express from "express";

const roleRouter = express.Router();

roleRouter.post("/role", create);
roleRouter.get("/roles", findAll);
roleRouter.put("/role/:id", updateRole);
roleRouter.delete("/role/:id", deletRole);

export default roleRouter;
