// models/purchaseOrder.model.js
import mongoose from "mongoose";

const wareHouses = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    nameWareHouse: {
      type: String,
    },
    status: {
      type: String,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("WareHouse", wareHouses);
