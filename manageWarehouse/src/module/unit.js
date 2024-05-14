import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        name: { type: String },
        
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Order = mongoose.model("unit", orderSchema);
export default Order;
