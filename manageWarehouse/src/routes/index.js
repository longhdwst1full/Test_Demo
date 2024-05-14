import express from "express";
import { userController } from "../controllers/user.js";
import { SuplierController } from "../controllers/suplier.js";
import { unitController } from "../controllers/unit.js";
import { ProductController } from "../controllers/product.js";
import { InfoInputController } from "../controllers/inputinfo.js";
import { OutInputController } from "../controllers/outinfo.js";

const router = express.Router();

// user
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateInfor);
router.get("/users", userController.getAllUser);
router.delete("/user/:id", userController.deleteUser);
 
// suplier
router.post("/suplier", SuplierController.createSuplier);
router.put("/suplier/update/:id", SuplierController.updateInfor);
router.get("/suplier", SuplierController.getAllSuplier);
router.delete("/suplier/:id", SuplierController.deleteSuplier);
 
// unit 
router.post("/unit", unitController.createunit);
router.put("/unit/:id", unitController.updateInfor);
router.get("/unit", unitController.getAllunit);
router.delete("/unit/:id", unitController.deleteunit);
 
// product 
router.post("/product", ProductController.createProduct);
router.put("/product/:id", ProductController.updateInfor);
router.get("/product", ProductController.getAllProduct)
router.delete("/product/:id", ProductController.deleteProduct);
 
// bill input info 
router.post("/inputBill", InfoInputController.createInfoInput);
router.put("/inputBill/:id", InfoInputController.updateInfor);
router.get("/inputBill", InfoInputController.getAllInfoInput)
router.delete("/inputBill/:id", InfoInputController.deleteInfoInput);
 
// bill output info 
router.post("/outputBill", OutInputController.createOutInput);
router.put("/outputBill/:id", OutInputController.updateInfor);
router.get("/outputBill", OutInputController.getAllOutInput)
router.delete("/outputBill/:id", OutInputController.deleteOutInput);
 
export default router;
