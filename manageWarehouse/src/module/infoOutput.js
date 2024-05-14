import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String },
    count: { type: Number },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    // thông tin hóa đơn ngày nhập 
    IdInputInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InputInfo",
    },
    // user khách
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("OutInfo", orderSchema);
export default Order;
