// models/purchaseOrder.model.js
import mongoose from "mongoose";

const PurchaseOrder = new mongoose.Schema(
  "",
  {
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    order_date: {
      type: String,
      default: new Date(),
    },
    status: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("order", PurchaseOrder);
