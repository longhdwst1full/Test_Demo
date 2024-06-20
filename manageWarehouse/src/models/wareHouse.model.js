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
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("wareHouse", wareHouses);
