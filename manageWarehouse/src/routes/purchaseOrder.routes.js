// routes/purchaseOrder.routes.js
import { create, findAll } from "../controllers/purchaseOrder.controller.js";

import express from "express";

const purchaseOrderRouter = express.Router(); 

  purchaseOrderRouter.post("/purchase-orders", create);
  purchaseOrderRouter.get("/purchase-orders", findAll);
 

  export default purchaseOrderRouter
