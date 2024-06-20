// models/product.model.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    nameCate: {
      type: String,
    },

    status: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("category", categorySchema);
