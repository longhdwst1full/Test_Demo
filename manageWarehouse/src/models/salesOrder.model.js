// models/salesOrder.model.js
import mongoose from "mongoose";

//đơn hàng xuất kho
const salesOrderSchema = new mongoose.Schema(
  {
    // tên hóa đơn
    title: String,
    // xuất cho ai
    user_id_buy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user_id_sell: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        priceProduct: Number,
        // đơn vị tính
        unit: String,
      },
    ],
    totalOutput: Number,
    status: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("salesOrder", salesOrderSchema);
