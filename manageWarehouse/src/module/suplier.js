import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        name: { type: String },
        address: { type: String },
        email: { type: String },
        contractDate: { type: Date },
        phone: { type: String, },
        moreInfo: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Order = mongoose.model("suplier", orderSchema);
export default Order;
