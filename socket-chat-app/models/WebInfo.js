import mongoose from "mongoose";

const webInfoSchema = new mongoose.Schema(
  {
    name: String,
    value: Object,
  },
  { timestamps: true }
);

export default mongoose.model("webinfo", webInfoSchema);
