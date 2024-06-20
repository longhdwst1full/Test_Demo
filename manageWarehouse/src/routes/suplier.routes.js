import express from "express";
import {
  createSuplier,
  deleteSuplier,
  findAllSuplier,
  updateSuplier,
} from "../controllers/suplier.controller.js";

const suplierRouter = express.Router();

suplierRouter.post("/suplier", createSuplier);
suplierRouter.get("/supliers", findAllSuplier);
suplierRouter.put("/suplier/:id", updateSuplier);
suplierRouter.delete("/suplier/:id", deleteSuplier);

export default suplierRouter;
