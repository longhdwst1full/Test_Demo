import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String },
    idSuplier: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "suplier",
    },
    idUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "unit",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("product", orderSchema);
export default Order;
