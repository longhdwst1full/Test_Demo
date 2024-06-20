// routes/product.routes.js
import { create, findAll } from "../controllers/product.controller.js";

import express from "express";

const productRouter = express.Router();

productRouter.post("/products", create);
productRouter.get("/products", findAll);

export default productRouter;
