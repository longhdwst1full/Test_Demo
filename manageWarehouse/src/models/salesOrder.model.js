// models/salesOrder.model.js
import mongoose from "mongoose";

const salesOrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

export default mongoose.model("salesOrder", salesOrderSchema);
