// models/Inventory.model.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WareHouse",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Inventory", inventorySchema);
