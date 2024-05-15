// routes/purchaseOrder.routes.js
import { create, findAll } from "../controllers/purchaseOrder.controller.js";

export default app => {
  app.post("/purchase-orders", create);
  app.get("/purchase-orders", findAll);
};
