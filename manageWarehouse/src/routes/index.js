import express from "express";
import productRouter from "./product.routes.js";
import saleRouter from "./salesOrder.routes.js";
import purchaseOrderRouter from "./purchaseOrder.routes.js";
import roleRouter from "./role.routes.js";
import categoryRouter from "./category.router.js";
import invertoryRouter from "./inventory.router.js";
import suplierRouter from "./suplier.routes.js";
import wareHouseRouter from "./wareHouse.routes.js";
import userRouter from "./user.routes.js";

const router = express.Router();

router.use("/", productRouter);
router.use("/", saleRouter);
router.use("/", roleRouter);
router.use("/", categoryRouter);
router.use("/", purchaseOrderRouter);
router.use("/", invertoryRouter);
router.use("/", suplierRouter);
router.use("/", wareHouseRouter);
router.use("/", userRouter);

export default router;
