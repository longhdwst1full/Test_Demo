// routes/product.routes.js
import { create, findAll } from "../controllers/product.controller.js";

import express from "express";

const productRouter = express.Router();

productRouter.post("/product", create);
productRouter.get("/products", findAll);

export default productRouter;
