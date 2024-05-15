// routes/salesOrder.routes.js
import { create, findAll } from "../controllers/salesOrder.controller.js";

export default app => {
  app.post("/sales-orders", create);
  app.get("/sales-orders", findAll);
};
