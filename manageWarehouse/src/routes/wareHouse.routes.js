import express from "express";
import {
  createWh,
  deletWh,
  findAllWh,
  updateWh,
} from "../controllers/wareHouse.controller.js";

const wareHouseRouter = express.Router();

wareHouseRouter.post("/wareHouse", createWh);
wareHouseRouter.get("/wareHouses", findAllWh);
wareHouseRouter.put("/wareHouse/:id", updateWh);
wareHouseRouter.delete("/wareHouse/:id", deletWh);

export default wareHouseRouter;
