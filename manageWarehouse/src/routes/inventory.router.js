import {
  createInvertory,
  deletInvertory,
  findAllInvertory,
  updateInventory,
} from "../controllers/inventory.controller.js";
import express from "express";

const invertoryRouter = express.Router();

invertoryRouter.post("/invertory", createInvertory);
invertoryRouter.get("/invertorys", findAllInvertory);
invertoryRouter.put("/invertory/:id", updateInventory);
invertoryRouter.delete("/invertory/:id", deletInvertory);

export default invertoryRouter;
