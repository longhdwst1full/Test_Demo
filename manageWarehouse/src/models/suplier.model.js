import mongoose from "mongoose";

const suplierSchema = new mongoose.Schema(
  {
    nameSulier: {
      type: String,
    },
    address: {
      type: String,
    },
    contact_info: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("suplier", suplierSchema);
