import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        name: { type: String },
        address: { type: String },
        email: { type: String },
         
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

const Order = mongoose.model("user", orderSchema);
export default Order;