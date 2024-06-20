// routes/salesOrder.routes.js
import { create, findAll } from "../controllers/salesOrder.controller.js";

import express from "express";

const saleRouter = express.Router();

  saleRouter.post("/sales-orders", create);
  saleRouter.get("/sales-orders", findAll);
 

  export default saleRouter
