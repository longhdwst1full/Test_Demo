// models/product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    // giá bán sp
    price: {
      type: Number,
    },
    unit: {
      type: String,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    idSuplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suplier",
    },
    image_url: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
