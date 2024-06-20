// models/purchaseOrder.model.js
import mongoose from "mongoose";

//đơn hàng nhập kho
const PurchaseOrder = new mongoose.Schema(
  {
    // tên hóa đơn
    title: String,
    //nhà phân phối
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suplier",
    },
    // người nhận là nhân viên role
    user_receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // ở kho hàng nào
    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WareHouse",
    },
    // làm gôp
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        priceInput: Number,
        // đơn vị tính
        unit: String,
      },
    ],
    status: {
      type: String,
    },
    totalInput: Number,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Purchase_Order", PurchaseOrder);
