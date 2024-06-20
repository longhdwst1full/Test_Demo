import {
  create,
  deletCate,
  findAllCate,
  updateCate,
} from "../controllers/category.controller.js";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.post("/category", create);
categoryRouter.get("/categorys", findAllCate);
categoryRouter.patch("/category/:id", updateCate);
categoryRouter.delete("/category/:id", deletCate);

export default categoryRouter;
