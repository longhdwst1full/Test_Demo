// routes/product.routes.js
import { create, findAll } from "../controllers/product.controller.js";

export default app => {
  app.post("/products", create);
  app.get("/products", findAll);
};
