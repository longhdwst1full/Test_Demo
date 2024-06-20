import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
    },
    permissions: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("role", productSchema);
