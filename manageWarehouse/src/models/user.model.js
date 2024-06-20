import mongoose from "mongoose";

const customers = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", customers);
